import { LitElement, html, nothing } from 'lit';

import './mysmart-music-control-editor.js';
import './mysmart-music-control-favorites.js';
import {
  DISPLAY_MODE_COMPACT,
  DISPLAY_MODE_FULL,
  DISPLAY_MODE_MINIMAL,
  DISPLAY_MODE_TABLET,
  buildFavoritesCacheKey,
  computeProportionalGroupVolumes,
  favoriteTypeLabel,
  findFavoriteLookupMatch,
  findFavoritesEntityId,
  getDisplayMode,
  getPreferredBrowseEntityId,
  normalizeCssSize,
  normalizeFavoriteType,
  prettifyFavoriteType,
  shouldRunProgressClock,
} from './mysmart-music-control-helpers.js';
import { translateCardString } from './mysmart-music-control-i18n.js';
import { performCardAction } from './mysmart-music-control-actions.js';
import { cardStyles } from './mysmart-music-control-styles.js';
import { loadFavoriteData } from './mysmart-music-control-favorites-repository.js';

const SCREEN_PLAYER = 'player';
const SCREEN_GROUPING = 'grouping';
const SCREEN_FAVORITES = 'favorites';
const SCREEN_VOLUMES = 'volumes';

const REPEAT_MODES = ['off', 'all', 'one'];
const UPDATE_INTERVAL_MS = 1000;
const FAVORITE_VIEW_LIST = 'list';
const FAVORITE_VIEW_TILES = 'tiles';
const SEEK_WAVE_WIDTH = 480;
const SEEK_WAVE_HEIGHT = 24;
const SEEK_WAVE_LENGTH = 32;
const SEEK_WAVE_AMPLITUDE = 5;
const SEEK_COMMIT_HOLD_MS = 1800;

class MySmartMusicControl extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _screen: { state: true },
      _activeStreamKey: { state: true },
      _activeStreamCoordinator: { state: true },
      _groupDraft: { state: true },
      _draftStreamKey: { state: true },
      _isApplyingGroup: { state: true },
      _progressNow: { state: true },
      _volumePreview: { state: true },
      _seekPreview: { state: true },
      _favoriteMetadata: { state: true },
      _favoriteBrowseItems: { state: true },
      _isCompactMenuOpen: { state: true },
      _isMinimalCollapsed: { state: true },
      _seekWaveSpan: { state: true },
    };
  }

  constructor() {
    super();
    this._screen = SCREEN_PLAYER;
    this._activeStreamKey = '';
    this._activeStreamCoordinator = '';
    this._groupDraft = [];
    this._draftStreamKey = '';
    this._isApplyingGroup = false;
    this._progressNow = Date.now();
    this._volumePreview = {};
    this._seekPreview = {};
    this._favoriteMetadata = {};
    this._favoriteBrowseItems = {};
    this._favoriteDataKey = '';
    this._favoriteDataRequestKey = '';
    this._favoriteDataLoading = false;
    this._favoriteDataReloadRequested = false;
    this._clock = null;
    this._activeVolumeDrag = null;
    this._activeSeekDrag = null;
    this._volumeMoveHandler = this._handleVolumePointerMove.bind(this);
    this._volumeUpHandler = this._handleVolumePointerUp.bind(this);
    this._seekMoveHandler = this._handleSeekPointerMove.bind(this);
    this._seekUpHandler = this._handleSeekPointerUp.bind(this);
    this._isCompactMenuOpen = false;
    this._isMinimalCollapsed = false;
    this._hasInitializedCollapse = false;
    this._seekPreviewTimers = {};
    this._seekWaveSpan = SEEK_WAVE_WIDTH;
    this._seekWaveResizeObserver = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncProgressClock();
    this._syncSeekWaveResizeObserver();
  }

  _syncSeekWaveResizeObserver() {
    if (this._seekWaveResizeObserver || typeof ResizeObserver === 'undefined') {
      return;
    }

    this._seekWaveResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const measuredWidth = entry.contentRect?.width || 0;
        this._growSeekWaveSpan(measuredWidth);
      }
    });
  }

  _growSeekWaveSpan(measuredWidth) {
    // The wave pattern tiles two copies side by side and animates by translating one
    // copy-width, so it only stays seamless if a single copy is at least as wide as the
    // visible track. Grow (never shrink, to avoid churn) to a multiple of the wave length
    // so the tiling stays phase-aligned.
    const required = Math.ceil(Math.max(measuredWidth, SEEK_WAVE_WIDTH) / SEEK_WAVE_LENGTH) * SEEK_WAVE_LENGTH;
    if (required > this._seekWaveSpan) {
      this._seekWaveSpan = required;
    }
  }

  _observeSeekTrackWidth() {
    if (!this._seekWaveResizeObserver) {
      return;
    }

    const track = this.renderRoot?.querySelector('.custom-seek-track');
    if (!track || this._observedSeekTrack === track) {
      return;
    }

    if (this._observedSeekTrack) {
      this._seekWaveResizeObserver.unobserve(this._observedSeekTrack);
    }

    this._observedSeekTrack = track;
    this._seekWaveResizeObserver.observe(track);
    this._growSeekWaveSpan(track.clientWidth);
  }

  _shouldRunProgressClock() {
    const activeStream = this._getActiveStream(this._getStreams());
    const stateObj = activeStream?.stateObj;
    return shouldRunProgressClock({
      isConnected: this.isConnected,
      playerVisible: [DISPLAY_MODE_FULL, DISPLAY_MODE_TABLET].includes(this._getDisplayMode()) && this._screen === SCREEN_PLAYER,
      seekbarVisible: this.config?.show_seekbar !== false,
      mediaState: stateObj?.state,
      mediaDuration: stateObj?.attributes?.media_duration,
    });
  }

  _syncProgressClock() {
    if (!this._shouldRunProgressClock()) {
      this._stopProgressClock();
      return;
    }

    if (this._clock) {
      return;
    }

    this._progressNow = Date.now();
    this._clock = window.setInterval(() => {
      this._progressNow = Date.now();
    }, UPDATE_INTERVAL_MS);
  }

  _stopProgressClock() {
    if (!this._clock) {
      return;
    }

    window.clearInterval(this._clock);
    this._clock = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopProgressClock();

    if (this._seekWaveResizeObserver) {
      this._seekWaveResizeObserver.disconnect();
      this._seekWaveResizeObserver = null;
    }
    this._observedSeekTrack = null;

    this._teardownVolumePointerListeners();
    this._teardownSeekPointerListeners();
    for (const timerId of Object.values(this._seekPreviewTimers)) {
      window.clearTimeout(timerId);
    }
    this._seekPreviewTimers = {};
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    this._syncProgressClock();
    this._observeSeekTrackWidth();

    const browseActive = this._screen === SCREEN_FAVORITES;
    if (browseActive && (changedProperties.has('hass') || changedProperties.has('config') || changedProperties.has('_screen'))) {
      this._maybeLoadBrowseData();
    }

    if (
      changedProperties.has('hass')
      || changedProperties.has('config')
      || changedProperties.has('_activeStreamKey')
      || changedProperties.has('_activeStreamCoordinator')
    ) {
      this._reconcileActiveStreamState();
    }

  }

  setConfig(config) {
    const entities = Array.isArray(config?.entities)
      ? config.entities.filter(Boolean)
      : (config?.entity ? [config.entity] : []);

    if (!entities.length) {
      throw new Error('You need to define one or more media_player entities');
    }

    this.config = {
      title: '',
      favorites_entity: '',
      card_background: '',
      accent_color: '',
      active_color: '',
      tab_background: '',
      tab_border_color: '',
      inactive_button_background: '',
      inactive_tab_button_background: '',
      stream_selector_active_color: '',
      slider_remaining: '',
      player_button_background: '',
      play_button_background: '',
      play_button_icon_color: '',
      display_mode: DISPLAY_MODE_FULL,
      height: '',
      start_collapsed: false,
      tap_action: { action: 'none' },
      show_title: true,
      show_artwork: true,
      show_speaker_pill: true,
      show_album_title: true,
      show_seekbar: true,
      show_volume: true,
      always_show_stream_selector: false,
      browse_view: FAVORITE_VIEW_LIST,
      ...config,
      entities,
    };

    const displayMode = this._getDisplayMode();
    if (displayMode === DISPLAY_MODE_MINIMAL) {
      if (!this._hasInitializedCollapse) {
        this._isMinimalCollapsed = this.config?.start_collapsed === true;
        this._hasInitializedCollapse = true;
      }
    } else {
      this._isMinimalCollapsed = false;
      this._hasInitializedCollapse = false;
    }

    if (displayMode !== DISPLAY_MODE_COMPACT) {
      this._isCompactMenuOpen = false;
    }
  }

  static async getConfigElement() {
    return document.createElement('mysmart-music-control-editor');
  }

  static getStubConfig() {
    return {
      entities: ['media_player.living_room'],
    };
  }

  getCardSize() {
    return 10;
  }

  render() {
    const streams = this._getStreams();
    const activeStream = this._getActiveStream(streams);
    const activeState = activeStream?.stateObj || null;
    const allFavorites = this._getFavorites();
    const favorites = allFavorites;
    const hasFavorites = allFavorites.length > 0;
    const headerTitle = this.config?.title?.trim();
    const displayMode = this._getDisplayMode();

    return html`
      <ha-card class=${this._getShellClassNames(displayMode)} style=${this._styleMap()}>
        <div class="content ${this._hasFixedHeight(displayMode) ? 'has-fixed-height' : ''} ${displayMode === DISPLAY_MODE_MINIMAL ? 'content-minimal' : ''}">
          ${displayMode === DISPLAY_MODE_MINIMAL
            ? this._renderMinimalMode(activeState, activeStream)
            : displayMode === DISPLAY_MODE_TABLET
            ? this._renderTabletMode(streams, activeState, activeStream, headerTitle, favorites, hasFavorites)
            : html`
              <div class="top-shell ${this._hasFixedHeight(displayMode) ? 'top-shell-fixed' : ''}">
                ${displayMode === DISPLAY_MODE_COMPACT
                  ? this._renderCompactHeader(streams, activeStream, headerTitle, hasFavorites)
                  : (headerTitle || streams.length > 1 || this.config?.always_show_stream_selector === true)
                    ? this._renderHeader(streams, activeStream, headerTitle)
                    : nothing}
                ${displayMode === DISPLAY_MODE_FULL ? this._renderScreenTabs(hasFavorites) : nothing}
                ${displayMode === DISPLAY_MODE_COMPACT ? this._renderCompactMenu(hasFavorites) : nothing}
              </div>
              <div class="body-shell ${this._hasFixedHeight(displayMode) ? 'body-shell-scroll' : ''}">
                ${displayMode === DISPLAY_MODE_COMPACT
                  ? this._renderCompactBody(activeState, activeStream, favorites, hasFavorites)
                  : this._renderBody(activeState, activeStream, favorites, hasFavorites)}
              </div>
            `}
        </div>
      </ha-card>
    `;
  }

  _styleMap() {
    const styles = [];
    const displayMode = this._getDisplayMode();
    const activeColor = this.config?.active_color || this.config?.accent_color;
    const fixedHeight = displayMode !== DISPLAY_MODE_MINIMAL
      ? normalizeCssSize(this.config?.height)
      : '';

    if (this.config?.card_background) {
      styles.push(`--mysmart-music-card-background:${this.config.card_background}`);
    }

    if (activeColor) {
      styles.push(`--mysmart-music-card-accent:${activeColor}`);
    }

    if (this.config?.tab_background) {
      styles.push(`--mysmart-music-card-tab-background:${this.config.tab_background}`);
    }

    if (this.config?.tab_border_color) {
      styles.push(`--mysmart-music-card-tab-border-color:${this.config.tab_border_color}`);
    }

    if (this.config?.inactive_button_background) {
      styles.push(`--mysmart-music-card-button-surface:${this.config.inactive_button_background}`);
      styles.push(`--mysmart-music-card-surface:${this.config.inactive_button_background}`);
    }

    if (this.config?.inactive_tab_button_background) {
      styles.push(`--mysmart-music-card-tab-button-surface:${this.config.inactive_tab_button_background}`);
    }

    if (this.config?.stream_selector_active_color) {
      styles.push(`--mysmart-music-card-stream-selector-active-color:${this.config.stream_selector_active_color}`);
    }

    if (this.config?.slider_remaining) {
      styles.push(`--mysmart-music-card-slider-remaining:${this.config.slider_remaining}`);
    }

    if (this.config?.player_button_background) {
      styles.push(`--mysmart-music-card-player-button-background:${this.config.player_button_background}`);
    }

    if (this.config?.play_button_background) {
      styles.push(`--mysmart-music-card-play-button-background:${this.config.play_button_background}`);
    }

    if (this.config?.play_button_icon_color) {
      styles.push(`--mysmart-music-card-play-button-icon-color:${this.config.play_button_icon_color}`);
    }

    if (fixedHeight) {
      styles.push(`--mysmart-music-card-height:${fixedHeight}`);
    }

    return styles.join(';');
  }

  _t(key, params = {}) {
    return translateCardString(this.hass, key, params);
  }

  _getDisplayMode() {
    return getDisplayMode(this.config);
  }

  _hasFixedHeight(displayMode) {
    return displayMode !== DISPLAY_MODE_MINIMAL && Boolean(normalizeCssSize(this.config?.height));
  }

  _getShellClassNames(displayMode) {
    const classes = ['shell', `shell-${displayMode}`];
    if (this._hasFixedHeight(displayMode)) {
      classes.push('has-fixed-height');
    }
    if (displayMode === DISPLAY_MODE_MINIMAL && this._isMinimalCollapsed) {
      classes.push('minimal-collapsed-shell');
    }
    return classes.join(' ');
  }

  _renderHeader(streams, activeStream, headerTitle) {
    const showStreamSelector = streams.length > 1 || this.config?.always_show_stream_selector === true;

    return html`
      <div class="header ${headerTitle ? '' : 'header-no-title'}">
        ${headerTitle ? html`<div class="title">${headerTitle}</div>` : html`<div></div>`}
        ${showStreamSelector ? this._renderStreamPills(streams, activeStream) : nothing}
      </div>
    `;
  }

  _renderStreamPills(streams, activeStream) {
    return html`
      <div class="stream-pills">
        ${streams.map((stream) => html`
          <button
            class="stream-pill ${stream.key === activeStream?.key ? 'active' : ''} ${this._isStreamPlaying(stream) ? 'is-playing has-indicator' : ''}"
            @click=${() => this._selectStream(stream.key)}
          >
            <span class="stream-pill-content">
              <span class="stream-pill-icon-slot" aria-hidden="true">
                ${this._isStreamPlaying(stream) ? html`
                  <span class="stream-pill-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                ` : nothing}
              </span>
              <span class="stream-pill-label">${stream.label}</span>
            </span>
          </button>
        `)}
      </div>
    `;
  }

  _renderCompactHeader(streams, activeStream, headerTitle, hasFavorites) {
    const showStreamSelector = streams.length > 1 || this.config?.always_show_stream_selector === true;

    return html`
      <div class="compact-header">
        <div class="compact-header-row">
          <div class="compact-header-main">
            ${showStreamSelector ? this._renderStreamPills(streams, activeStream) : nothing}
          </div>
          <button
            class="menu-button"
            title=${this._isCompactMenuOpen ? this._t('close_menu') : this._t('compact_menu')}
            aria-label=${this._isCompactMenuOpen ? this._t('close_menu') : this._t('compact_menu')}
            @click=${() => {
              this._isCompactMenuOpen = !this._isCompactMenuOpen;
            }}
          >
            <ha-icon icon=${this._isCompactMenuOpen ? 'mdi:close' : 'mdi:menu'}></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  _availableScreens(hasFavorites) {
    const screens = [
      { key: SCREEN_PLAYER, label: this._t('player') },
      { key: SCREEN_GROUPING, label: this._t('grouping') },
      { key: SCREEN_VOLUMES, label: this._t('volumes') },
    ];

    if (hasFavorites) {
      screens.push({ key: SCREEN_FAVORITES, label: this._t('browse') });
    }

    return screens;
  }

  _renderScreenTabs(hasFavorites) {
    const tabs = this._availableScreens(hasFavorites);

    return html`
      <div class="screen-tabs">
        ${tabs.map((tab) => html`
          <button
            class="screen-tab ${this._screen === tab.key ? 'active' : ''}"
            @click=${() => {
              this._screen = tab.key;
            }}
          >
            ${tab.label}
          </button>
        `)}
      </div>
    `;
  }

  _renderCompactMenu(hasFavorites) {
    if (!this._isCompactMenuOpen) {
      return nothing;
    }

    return html`
      <div class="compact-menu-backdrop" @click=${() => { this._isCompactMenuOpen = false; }}>
        <div class="compact-menu-panel" @click=${(event) => event.stopPropagation()}>
          ${this._availableScreens(hasFavorites).map((screen) => html`
            <button
              class="compact-menu-item ${this._screen === screen.key ? 'active' : ''}"
              @click=${() => {
                this._screen = screen.key;
                this._isCompactMenuOpen = false;
              }}
            >
              ${screen.label}
            </button>
          `)}
        </div>
      </div>
    `;
  }

  _renderBody(activeState, activeStream, favorites, hasFavorites) {
    if (!activeState || !activeStream) {
      return html`
        <div class="empty-state">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t('no_speakers')}</div>
        </div>
      `;
    }

    if (this._screen === SCREEN_GROUPING) {
      return this._renderGrouping(activeStream);
    }

    if (this._screen === SCREEN_VOLUMES) {
      return this._renderVolumes(activeStream);
    }

    if (this._screen === SCREEN_FAVORITES && hasFavorites) {
      return this._renderFavorites(activeStream, favorites);
    }

    return this._renderPlayer(activeState, activeStream);
  }

  _renderCompactBody(activeState, activeStream, favorites, hasFavorites) {
    if (!activeState || !activeStream) {
      return html`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t('no_speakers')}</div>
        </div>
      `;
    }

    if (this._screen === SCREEN_GROUPING) {
      return this._renderGrouping(activeStream);
    }

    if (this._screen === SCREEN_VOLUMES) {
      return this._renderVolumes(activeStream);
    }

    if (this._screen === SCREEN_FAVORITES && hasFavorites) {
      return this._renderFavorites(activeStream, favorites);
    }

    return this._renderCompactPlayer(activeState, activeStream);
  }

  _renderMinimalMode(activeState, activeStream) {
    if (!activeState || !activeStream) {
      return html`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t('no_speakers')}</div>
        </div>
      `;
    }

    return this._renderMinimalPlayer(activeState, activeStream);
  }

  _renderTabletMode(streams, activeState, activeStream, headerTitle, favorites, hasFavorites) {
    const showStreamSelector = streams.length > 1 || this.config?.always_show_stream_selector === true;
    const showArtwork = this.config?.show_artwork !== false;
    const artwork = activeState ? this._getArtworkUrl(activeState) : '';

    return html`
      <div class="tablet-layout ${showArtwork ? '' : 'no-artwork'}">
        ${showArtwork ? html`
          <div class="tablet-artwork ${artwork ? 'has-artwork' : ''}" style=${artwork ? `background-image:url("${artwork}")` : ''}>
            ${!artwork ? html`<ha-icon icon="mdi:album"></ha-icon>` : nothing}
          </div>
        ` : nothing}

        <div class="tablet-main">
          <div class="tablet-header">
            <div class="tablet-header-start">
              ${headerTitle ? html`<div class="title">${headerTitle}</div>` : nothing}
              ${showStreamSelector ? this._renderStreamPills(streams, activeStream) : nothing}
            </div>
            ${this._renderScreenTabs(hasFavorites)}
          </div>
          <div class="body-shell tablet-body">
            ${this._renderTabletBody(activeState, activeStream, favorites, hasFavorites)}
          </div>
        </div>
      </div>
    `;
  }

  _renderTabletBody(activeState, activeStream, favorites, hasFavorites) {
    if (!activeState || !activeStream) {
      return html`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t('no_speakers')}</div>
        </div>
      `;
    }

    if (this._screen === SCREEN_GROUPING) {
      return this._renderGrouping(activeStream);
    }

    if (this._screen === SCREEN_VOLUMES) {
      return this._renderVolumes(activeStream);
    }

    if (this._screen === SCREEN_FAVORITES && hasFavorites) {
      return this._renderFavorites(activeStream, favorites, FAVORITE_VIEW_TILES);
    }

    return this._renderTabletPlayer(activeState, activeStream);
  }

  _renderTabletPlayer(stateObj, activeStream) {
    const model = this._getPlayerViewModel(stateObj, activeStream);
    const showSeekbar = this.config?.show_seekbar !== false;
    const showVolume = this.config?.show_volume !== false;
    const isMuted = stateObj.attributes.is_volume_muted === true;
    const volumeKey = `player:${activeStream.coordinator}`;
    const displayedVolume = this._getDisplayedVolume(volumeKey, model.volume);

    return html`
      <div class="tablet-player">
        <div class="tablet-player-top">
          <div class="tablet-meta">
            ${this.config?.show_title !== false ? html`<div class="track-title">${model.title}</div>` : nothing}
            ${model.artist ? html`<div class="track-subtitle">${model.artist}</div>` : nothing}
            ${this.config?.show_album_title !== false && model.album ? html`<div class="track-album">${model.album}</div>` : nothing}
          </div>
          <div class="transport-row tablet-transport">
            ${this._renderTransportButtons(model, activeStream)}
          </div>
        </div>

        ${showSeekbar || showVolume ? html`
          <div class="tablet-progress-row ${showSeekbar ? '' : 'no-seekbar'}">
            ${showSeekbar ? html`
              <div class="tablet-seek">
                <span class="tablet-time">${this._formatTime(model.displayedPosition)}</span>
                ${this._renderSeekSlider({
                  key: `seek:${activeStream.coordinator}`,
                  value: model.displayedPosition,
                  duration: model.duration,
                  label: this._t('seek_position'),
                  descriptor: { entityId: activeStream.coordinator, currentValue: model.currentPosition, duration: model.duration },
                  animate: model.isPlaying && !this._activeSeekDrag,
                  flatten: !model.isPlaying && !this._activeSeekDrag,
                })}
                <span class="tablet-time">${this._formatTime(model.duration)}</span>
              </div>
            ` : nothing}
            ${showVolume ? html`
              <div class="tablet-volume">
                <button
                  class="tablet-mute-button ${isMuted ? 'is-muted' : ''}"
                  title=${isMuted ? this._t('unmute') : this._t('mute')}
                  aria-label=${isMuted ? this._t('unmute') : this._t('mute')}
                  aria-pressed=${isMuted ? 'true' : 'false'}
                  @click=${() => this._callService('media_player', 'volume_mute', { entity_id: activeStream.coordinator, is_volume_muted: !isMuted })}
                >
                  <ha-icon icon=${this._volumeIcon(displayedVolume, isMuted)}></ha-icon>
                </button>
                ${this._renderVolumeSlider({
                  key: volumeKey,
                  value: displayedVolume,
                  label: this._t('player_volume'),
                  descriptor: { type: 'player', entityId: activeStream.coordinator, currentValue: model.volume },
                })}
                <span class="volume-value">${displayedVolume}%</span>
              </div>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  _volumeIcon(volume, isMuted) {
    if (isMuted || volume <= 0) {
      return 'mdi:volume-off';
    }

    if (volume < 34) {
      return 'mdi:volume-low';
    }

    return volume < 67 ? 'mdi:volume-medium' : 'mdi:volume-high';
  }

  _renderTransportButtons(model, activeStream) {
    return html`
      <button class="icon-button ${model.shuffle ? 'active' : ''}" @click=${() => this._setShuffle(activeStream.coordinator, !model.shuffle)}>
        <ha-icon icon="mdi:shuffle-variant"></ha-icon>
      </button>
      <button class="icon-button" @click=${() => this._callService('media_player', 'media_previous_track', { entity_id: activeStream.coordinator })}>
        <ha-icon icon="mdi:skip-previous"></ha-icon>
      </button>
      <button class="play-button" @click=${() => this._callService('media_player', 'media_play_pause', { entity_id: activeStream.coordinator })}>
        <ha-icon icon=${model.isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
      </button>
      <button class="icon-button" @click=${() => this._callService('media_player', 'media_next_track', { entity_id: activeStream.coordinator })}>
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
      <button class="icon-button ${model.repeat !== 'off' ? 'active' : ''}" @click=${() => this._cycleRepeat(activeStream.coordinator, model.repeat)}>
        <ha-icon icon=${model.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}></ha-icon>
      </button>
    `;
  }

  _getPlayerViewModel(stateObj, activeStream) {
    const title = stateObj.attributes.media_title
      || stateObj.attributes.media_channel
      || stateObj.attributes.friendly_name
      || this._t('nothing_playing');
    const artist = stateObj.attributes.media_artist
      || stateObj.attributes.app_name
      || stateObj.attributes.source
      || (stateObj.attributes.media_channel ? '' : this._t('choose_something'));
    const album = stateObj.attributes.media_album_name || '';
    const artwork = this._getArtworkUrl(stateObj);
    const duration = Number(stateObj.attributes.media_duration) || 0;
    const currentPosition = this._getCurrentPosition(stateObj, duration);
    const displayedPosition = this._getDisplayedSeek(`seek:${activeStream.coordinator}`, currentPosition, duration);
    const volume = Math.round((Number(stateObj.attributes.volume_level) || 0) * 100);
    const isPlaying = ['playing', 'buffering'].includes(stateObj.state);
    const shuffle = stateObj.attributes.shuffle === true;
    const repeat = stateObj.attributes.repeat || 'off';

    return {
      title,
      artist,
      album,
      artwork,
      duration,
      currentPosition,
      displayedPosition,
      volume,
      isPlaying,
      shuffle,
      repeat,
    };
  }

  _getSpeakerCountLabel(count) {
    return count === 1 ? this._t('active_speakers_one') : this._t('active_speakers_other', { count });
  }

  _renderPlayer(stateObj, activeStream) {
    const model = this._getPlayerViewModel(stateObj, activeStream);

    return html`
      <div class="player-layout ${!this.config?.show_artwork ? 'compact-player' : ''}">
        ${this.config?.show_artwork !== false ? html`
          <div class="artwork-shell ${model.artwork ? 'has-artwork' : ''}" style=${model.artwork ? `background-image:url("${model.artwork}")` : ''}>
            ${!model.artwork ? html`<ha-icon icon="mdi:music-circle-outline"></ha-icon>` : nothing}
          </div>
        ` : nothing}

        <div class="meta">
          ${this.config?.show_speaker_pill !== false ? html`
            <div class="meta-chip">${this._getSpeakerCountLabel(activeStream.members.length)}</div>
          ` : nothing}
          ${this.config?.show_title !== false ? html`<div class="track-title">${model.title}</div>` : nothing}
          ${model.artist ? html`<div class="track-subtitle">${model.artist}</div>` : nothing}
          ${this.config?.show_album_title !== false && model.album ? html`<div class="track-album">${model.album}</div>` : nothing}
        </div>

        ${this.config?.show_seekbar !== false ? html`
          <div class="progress-block">
            ${this._renderSeekSlider({
              key: `seek:${activeStream.coordinator}`,
              value: model.displayedPosition,
              duration: model.duration,
              label: this._t('seek_position'),
              descriptor: { entityId: activeStream.coordinator, currentValue: model.currentPosition, duration: model.duration },
              animate: model.isPlaying && !this._activeSeekDrag,
              flatten: !model.isPlaying && !this._activeSeekDrag,
            })}
            <div class="time-row">
              <span>${this._formatTime(model.displayedPosition)}</span>
              <span>${this._formatTime(model.duration)}</span>
            </div>
          </div>
        ` : nothing}

        <div class="transport-row">
          ${this._renderTransportButtons(model, activeStream)}
        </div>

        ${this.config?.show_volume !== false ? html`
          <div class="volume-block">
            ${this._renderVolumeSlider({
              key: `player:${activeStream.coordinator}`,
              value: this._getDisplayedVolume(`player:${activeStream.coordinator}`, model.volume),
              label: this._t('player_volume'),
              descriptor: { type: 'player', entityId: activeStream.coordinator, currentValue: model.volume },
            })}
          </div>
        ` : nothing}
      </div>
    `;
  }

  _renderCompactPlayer(stateObj, activeStream) {
    const model = this._getPlayerViewModel(stateObj, activeStream);

    return html`
      <div class="compact-player-layout">
        ${this.config?.show_artwork !== false ? html`
          <div class="compact-artwork ${model.artwork ? 'has-artwork' : ''}" style=${model.artwork ? `background-image:url("${model.artwork}")` : ''}>
            ${!model.artwork ? html`<ha-icon icon="mdi:music"></ha-icon>` : nothing}
          </div>
        ` : nothing}
        <div class="compact-copy">
          ${this.config?.show_title !== false ? html`<div class="compact-title">${model.title}</div>` : nothing}
          ${model.artist ? html`<div class="compact-subtitle">${model.artist}</div>` : nothing}
        </div>
        <div class="compact-transport transport-row">
          ${this._renderTransportButtons(model, activeStream)}
        </div>
      </div>
    `;
  }

  _renderMinimalPlayer(stateObj, activeStream) {
    const model = this._getPlayerViewModel(stateObj, activeStream);
    const isPlaying = ['playing', 'buffering'].includes(stateObj?.state);

    return html`
      <div class="minimal-shell ${this._isMinimalCollapsed ? 'is-collapsed' : ''}">
        <div class="minimal-surface" @click=${(event) => this._handleMinimalSurfaceTap(event, activeStream.coordinator)}>
          ${this.config?.show_artwork !== false ? html`
            <div class="minimal-artwork ${model.artwork ? 'has-artwork' : ''}" style=${model.artwork ? `background-image:url("${model.artwork}")` : ''}>
              ${!model.artwork ? html`<ha-icon icon="mdi:music"></ha-icon>` : nothing}
            </div>
          ` : nothing}
          <div class="minimal-copy">
            ${this.config?.show_title !== false ? html`<div class="minimal-title">${model.title}</div>` : nothing}
            ${model.artist ? html`<div class="minimal-subtitle">${model.artist}</div>` : nothing}
          </div>
          <div class="minimal-controls">
            <button class="icon-button minimal-control" @click=${(event) => this._handleControlClick(event, () => this._callService('media_player', 'media_previous_track', { entity_id: activeStream.coordinator }))}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="play-button minimal-play" @click=${(event) => this._handleControlClick(event, () => this._callService('media_player', 'media_play_pause', { entity_id: activeStream.coordinator }))}>
              <ha-icon icon=${model.isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
            </button>
            <button class="icon-button minimal-control" @click=${(event) => this._handleControlClick(event, () => this._callService('media_player', 'media_next_track', { entity_id: activeStream.coordinator }))}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
            <button class="icon-button minimal-control" title=${this._t('minimize')} aria-label=${this._t('minimize')} @click=${(event) => this._handleControlClick(event, () => { this._isMinimalCollapsed = true; })}>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
          </div>
        </div>
        <button
          class="minimal-collapsed-button"
          title=${this._t('expand')}
          aria-label=${this._t('expand')}
          @click=${(event) => this._handleControlClick(event, () => {
            this._isMinimalCollapsed = false;
          })}
        >
          ${isPlaying ? html`
            <span class="stream-pill-bars compact-bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ` : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </button>
      </div>
    `;
  }

  _renderGrouping(activeStream) {
    const configuredSpeakers = this._getConfiguredSpeakerStates();
    const currentMembers = new Set(activeStream.members);
    const draftSet = new Set(this._groupDraft);

    return html`
      <div class="panel panel-tight grouping-panel">
        <div class="group-list">
          ${configuredSpeakers.map((speaker) => html`
            <label class="group-item ${currentMembers.has(speaker.entity_id) ? 'is-member' : ''}">
              <input
                class="group-item-input"
                type="checkbox"
                .checked=${draftSet.has(speaker.entity_id)}
                .disabled=${speaker.entity_id === activeStream.coordinator}
                @change=${(event) => this._toggleDraftSpeaker(speaker.entity_id, event.target.checked)}
              />
              <span class="group-item-checkbox" aria-hidden="true"></span>
              <div class="group-item-copy">
                <div class="group-item-name">${speaker.attributes.friendly_name || speaker.entity_id}</div>
                <div class="group-item-meta">${speaker.entity_id === activeStream.coordinator ? this._t('coordinator') : currentMembers.has(speaker.entity_id) ? this._t('currently_grouped') : this._t('available')}</div>
              </div>
              ${speaker.state === 'playing' ? html`<span class="group-status live">${this._t('live')}</span>` : nothing}
            </label>
          `)}
        </div>

        <div class="group-actions">
          <button class="secondary-button" @click=${() => this._resetDraft(activeStream)}>
            ${this._t('reset')}
          </button>
          <button class="secondary-button" @click=${() => this._ungroupAll()} ?disabled=${activeStream.members.length <= 1 || this._isApplyingGroup}>
            ${this._t('ungroup_all')}
          </button>
          <button class="primary-button" @click=${() => this._applyGrouping()} ?disabled=${this._isApplyingGroup}>
            ${this._isApplyingGroup ? this._t('applying') : this._t('apply_grouping')}
          </button>
        </div>
      </div>
    `;
  }

  _renderVolumes(activeStream) {
    const speakerStates = activeStream.members
      .map((entityId) => this.hass?.states?.[entityId])
      .filter(Boolean);
    const totalVolume = speakerStates.length
      ? Math.round(
          speakerStates.reduce((sum, speaker) => sum + (Number(speaker.attributes.volume_level) || 0), 0)
          / speakerStates.length
          * 100,
        )
      : 0;

    return html`
      <div class="panel panel-tight volumes-panel">
        <div class="volume-master">
          <div class="group-item-name">${this._t('overall')}</div>
          <div class="volume-slider-row">
            ${this._renderVolumeSlider({
              key: `group:${activeStream.coordinator}`,
              value: this._getDisplayedVolume(`group:${activeStream.coordinator}`, totalVolume),
              label: this._t('overall_volume'),
              descriptor: {
                type: 'group',
                currentValue: totalVolume,
                levels: speakerStates.map((speaker) => ({
                  entityId: speaker.entity_id,
                  currentValue: Math.round((Number(speaker.attributes.volume_level) || 0) * 100),
                })),
              },
            })}
            <span class="volume-value">${this._getDisplayedVolume(`group:${activeStream.coordinator}`, totalVolume)}%</span>
          </div>
        </div>

        <div class="volume-list">
          ${speakerStates.map((speaker) => {
            const speakerVolume = Math.round((Number(speaker.attributes.volume_level) || 0) * 100);
            return html`
              <div class="volume-item">
                <div class="group-item-name">${speaker.attributes.friendly_name || speaker.entity_id}</div>
                <div class="volume-slider-row">
                  ${this._renderVolumeSlider({
                    key: `speaker:${speaker.entity_id}`,
                    value: this._getDisplayedVolume(`speaker:${speaker.entity_id}`, speakerVolume),
                    label: `${speaker.attributes.friendly_name || speaker.entity_id} volume`,
                    descriptor: { type: 'speaker', entityId: speaker.entity_id, currentValue: speakerVolume },
                  })}
                  <span class="volume-value">${this._getDisplayedVolume(`speaker:${speaker.entity_id}`, speakerVolume)}%</span>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderFavorites(activeStream, favorites, view = this.config?.browse_view || FAVORITE_VIEW_LIST) {
    return html`
      <mysmart-music-control-favorites
        .hass=${this.hass}
        .activeStream=${activeStream}
        .favorites=${favorites}
        .view=${view}
        @favorite-played=${() => { this._screen = SCREEN_PLAYER; }}
      ></mysmart-music-control-favorites>
    `;
  }

  _handleMinimalSurfaceTap(event, entityId) {
    const path = event.composedPath?.() || [];
    if (path.some((node) => node instanceof HTMLElement && node.dataset?.actionStop === 'true')) {
      return;
    }

    if (this.config?.tap_action) {
      performCardAction(this, this.hass, this.config.tap_action, { entityId });
    }
  }

  _handleControlClick(event, action) {
    event.stopPropagation();
    event.preventDefault();
    const target = event.currentTarget;
    if (target?.dataset) {
      target.dataset.actionStop = 'true';
      window.requestAnimationFrame(() => {
        delete target.dataset.actionStop;
      });
    }
    action();
  }

  _maybeLoadBrowseData() {
    this._maybeLoadFavoriteData();
  }

  _getConfiguredSpeakerStates() {
    return (this.config?.entities || [])
      .map((entityId) => this.hass?.states?.[entityId])
      .filter(Boolean);
  }

  _getStreams() {
    const stateObjects = this._getConfiguredSpeakerStates();
    const streamsByKey = new Map();

    stateObjects.forEach((stateObj) => {
      const members = this._normalizeMembers(stateObj);
      const key = members.slice().sort().join('|') || stateObj.entity_id;
      const coordinator = this._getCoordinator(stateObj, members);

      if (streamsByKey.has(key)) {
        return;
      }

      streamsByKey.set(key, {
        key,
        coordinator,
        members,
        label: this._streamLabel(coordinator, members),
        stateObj: this.hass.states[coordinator] || stateObj,
      });
    });

    return Array.from(streamsByKey.values());
  }

  _normalizeMembers(stateObj) {
    const rawMembers = Array.isArray(stateObj.attributes.group_members)
      ? stateObj.attributes.group_members.filter((entityId) => (this.config?.entities || []).includes(entityId))
      : [];

    if (!rawMembers.includes(stateObj.entity_id)) {
      rawMembers.push(stateObj.entity_id);
    }

    return Array.from(new Set(rawMembers));
  }

  _getCoordinator(stateObj, members) {
    const orderedMembers = Array.isArray(stateObj.attributes.group_members)
      ? stateObj.attributes.group_members.filter((entityId) => members.includes(entityId))
      : [];

    const coordinatorAttr = orderedMembers[0];
    const coordinatorState = members.find((entityId) => this.hass?.states?.[entityId]?.attributes?.group_members?.[0] === entityId);

    return coordinatorState || coordinatorAttr || members[0] || stateObj.entity_id;
  }

  _streamLabel(coordinator, members) {
    const coordinatorState = this.hass?.states?.[coordinator];
    const coordinatorName = coordinatorState?.attributes?.friendly_name || coordinator?.replace('media_player.', '') || 'Stream';

    if (members.length <= 1) {
      return coordinatorName;
    }

    return `${coordinatorName} +${members.length - 1}`;
  }

  _isStreamPlaying(stream) {
    if (!stream) {
      return false;
    }

    return stream.members.some((entityId) => ['playing', 'buffering'].includes(this.hass?.states?.[entityId]?.state));
  }

  _getActiveStream(streams) {
    if (!streams.length) {
      return null;
    }

    return streams.find((stream) => stream.key === this._activeStreamKey)
      || streams.find((stream) => stream.coordinator === this._activeStreamCoordinator)
      || streams.find((stream) => this._isStreamPlaying(stream))
      || streams[0];
  }

  _reconcileActiveStreamState() {
    const streams = this._getStreams();
    const activeStream = this._getActiveStream(streams);

    if (!activeStream) {
      if (this._activeStreamKey || this._activeStreamCoordinator || this._draftStreamKey || this._groupDraft.length) {
        this._activeStreamKey = '';
        this._activeStreamCoordinator = '';
        this._draftStreamKey = '';
        this._groupDraft = [];
      }
      return;
    }

    const activeChanged = this._activeStreamKey !== activeStream.key || this._activeStreamCoordinator !== activeStream.coordinator;
    const draftExists = streams.some((stream) => stream.key === this._draftStreamKey);
    const shouldResetDraft = !draftExists || this._draftStreamKey !== activeStream.key || !this._groupDraft.length;

    if (this._activeStreamKey !== activeStream.key) {
      this._activeStreamKey = activeStream.key;
    }

    if (this._activeStreamCoordinator !== activeStream.coordinator) {
      this._activeStreamCoordinator = activeStream.coordinator;
    }

    if (activeChanged && shouldResetDraft) {
      this._groupDraft = activeStream.members.slice();
      this._draftStreamKey = activeStream.key;
    } else if (!draftExists && this._draftStreamKey) {
      this._draftStreamKey = '';
    }
  }

  _selectStream(streamKey) {
    this._activeStreamKey = streamKey;
    const stream = this._getStreams().find((entry) => entry.key === streamKey);
    this._activeStreamCoordinator = stream?.coordinator || '';
    if (stream) {
      this._groupDraft = stream.members.slice();
      this._draftStreamKey = stream.key;
    }
  }

  _toggleDraftSpeaker(entityId, checked) {
    const current = new Set(this._groupDraft);

    if (checked) {
      current.add(entityId);
    } else {
      current.delete(entityId);
    }

    this._groupDraft = Array.from(current);
  }

  _resetDraft(activeStream) {
    this._groupDraft = activeStream.members.slice();
    this._draftStreamKey = activeStream.key;
  }

  async _applyGrouping() {
    const streams = this._getStreams();
    const activeStream = this._getActiveStream(streams);
    if (!activeStream) {
      return;
    }

    const coordinator = activeStream.coordinator;
    const desiredMembers = Array.from(new Set([coordinator, ...(this._groupDraft || [])]));
    const currentMembers = activeStream.members;
    const membersToRemove = currentMembers.filter((entityId) => entityId !== coordinator && !desiredMembers.includes(entityId));
    const membersToAdd = desiredMembers.filter((entityId) => entityId !== coordinator && !currentMembers.includes(entityId));

    this._isApplyingGroup = true;

    try {
      for (const entityId of membersToRemove) {
        await this._callService('media_player', 'unjoin', { entity_id: entityId });
      }

      if (membersToAdd.length) {
        await this._callService('media_player', 'join', {
          entity_id: coordinator,
          group_members: membersToAdd,
        });
      }

      this._groupDraft = desiredMembers.slice();
      this._draftStreamKey = desiredMembers.slice().sort().join('|') || coordinator;
      this._activeStreamKey = this._draftStreamKey;
      this._activeStreamCoordinator = coordinator;
    } finally {
      this._isApplyingGroup = false;
    }
  }

  async _ungroupAll() {
    const streams = this._getStreams();
    const activeStream = this._getActiveStream(streams);
    if (!activeStream) {
      return;
    }

    this._isApplyingGroup = true;

    try {
      for (const entityId of activeStream.members) {
        if (entityId === activeStream.coordinator) {
          continue;
        }

        await this._callService('media_player', 'unjoin', { entity_id: entityId });
      }

      this._groupDraft = [activeStream.coordinator];
      this._draftStreamKey = activeStream.coordinator;
      this._activeStreamKey = activeStream.coordinator;
      this._activeStreamCoordinator = activeStream.coordinator;
    } finally {
      this._isApplyingGroup = false;
    }
  }

  _getFavorites() {
    const sensorId = this.config?.favorites_entity || this._findFavoritesEntity();
    if (!sensorId) {
      return [];
    }

    const sensorState = this.hass?.states?.[sensorId];
    const items = sensorState?.attributes?.items;

    if (!items || typeof items !== 'object') {
      return [];
    }

    const favoritesFromSensor = Object.entries(items).map(([mediaId, value]) => {
      const item = typeof value === 'object' && value !== null ? value : {};
      const favoriteName = typeof value === 'string' ? value : item.title || item.name || mediaId;
      const metadata = this._getFavoriteMetadata(mediaId, favoriteName);
      const browseItem = this._getFavoriteBrowseItem(mediaId, favoriteName);
      const rawType = browseItem.favoriteType
        || metadata.favoriteType
        || metadata.rawType
        || item.type
        || item.media_content_type
        || item.media_class
        || this._inferFavoriteType(mediaId, favoriteName, metadata);
      const image = this._resolveMediaUrl(
        browseItem.image
        || metadata.image
        || item.image
        || item.thumbnail
        || item.entity_picture
        || item.media_image_url
        || item.image_url
        || '',
      );
      const resolvedType = this._normalizeFavoriteType(rawType, mediaId, favoriteName, {
        ...metadata,
        mediaContentId: browseItem.media_content_id || metadata.mediaContentId,
        mediaContentType: browseItem.media_content_type || metadata.mediaContentType,
        favoriteType: browseItem.favoriteType || metadata.favoriteType,
      });

      return {
        mediaId,
        name: favoriteName,
        image,
        type: resolvedType,
        typeLabel: (browseItem.favoriteType || metadata.favoriteType || rawType)
          ? this._prettifyType(browseItem.favoriteType || metadata.favoriteType || rawType)
          : this._favoriteTypeLabel(resolvedType),
        media_content_id: browseItem.media_content_id || '',
        media_content_type: browseItem.media_content_type || '',
      };
    });

    return favoritesFromSensor;
  }

  _findFavoritesEntity() {
    return findFavoritesEntityId(this.hass?.states || {});
  }

  _getFavoriteMetadata(mediaId, title) {
    return findFavoriteLookupMatch(this._favoriteMetadata, mediaId, title);
  }

  _getFavoriteBrowseItem(mediaId, title) {
    return findFavoriteLookupMatch(this._favoriteBrowseItems, mediaId, title);
  }

  _favoriteTypeLabel(type) {
    return favoriteTypeLabel(type);
  }

  _prettifyType(value) {
    return prettifyFavoriteType(value);
  }

  _normalizeFavoriteType(value, mediaId = '', name = '', metadata = {}) {
    return normalizeFavoriteType(value, mediaId, name, metadata);
  }

  _inferFavoriteType(mediaId, name, metadata = {}) {
    return this._normalizeFavoriteType(metadata.rawType || '', mediaId, name, metadata);
  }

  async _maybeLoadFavoriteData() {
    const browseEntityId = getPreferredBrowseEntityId(this.config?.entities, this.hass?.states || {});
    const sensorId = this.config?.favorites_entity || this._findFavoritesEntity();
    const items = sensorId ? this.hass?.states?.[sensorId]?.attributes?.items : null;

    if (!browseEntityId || !sensorId || !items) {
      return;
    }

    const dataKey = `${browseEntityId}:${sensorId}:${buildFavoritesCacheKey(items)}`;
    if (dataKey === this._favoriteDataKey) {
      return;
    }

    if (this._favoriteDataLoading) {
      if (dataKey !== this._favoriteDataRequestKey) {
        this._favoriteDataReloadRequested = true;
      }
      return;
    }

    this._favoriteDataLoading = true;
    this._favoriteDataRequestKey = dataKey;

    try {
      const { browseItems, metadata } = await loadFavoriteData(
        this.hass,
        browseEntityId,
        (value) => this._resolveMediaUrl(value),
      );
      this._favoriteBrowseItems = browseItems;
      this._favoriteMetadata = metadata;
      this._favoriteDataKey = dataKey;
    } catch (error) {
      console.warn('[mysmart-music-control] Failed to load favorite browse data', error);
      this._favoriteBrowseItems = {};
      this._favoriteMetadata = {};
      this._favoriteDataKey = dataKey;
    } finally {
      this._favoriteDataLoading = false;
      this._favoriteDataRequestKey = '';

      if (this._favoriteDataReloadRequested) {
        this._favoriteDataReloadRequested = false;
        this._maybeLoadFavoriteData();
      }
    }
  }

  _getArtworkUrl(stateObj) {
    const picture = stateObj.attributes.entity_picture;
    if (!picture) {
      return '';
    }

    return this._resolveMediaUrl(picture);
  }

  _resolveMediaUrl(value) {
    if (!value) {
      return '';
    }

    const url = String(value).trim();
    if (!url) {
      return '';
    }

    if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('//')) {
      return url;
    }

    // Rewrite Home Assistant-local absolute URLs back to relative paths so the
    // mobile app keeps using the current in-app session/origin instead of a
    // separate certificate trust path for artwork requests.
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        const absoluteUrl = new URL(url);
        const localPrefixes = ['/api/', '/media/', '/local/', '/auth/', '/hassio/', '/static/'];
        if (localPrefixes.some((prefix) => absoluteUrl.pathname.startsWith(prefix))) {
          return `${absoluteUrl.pathname}${absoluteUrl.search}${absoluteUrl.hash}`;
        }
      } catch (_error) {
        return url;
      }

      return url;
    }

    // Keep Home Assistant-local media URLs relative so the mobile app reuses the
    // active in-app session/origin instead of opening a separate absolute URL.
    if (url.startsWith('/')) {
      return url;
    }

    if (url.startsWith('api/') || url.startsWith('media/') || url.startsWith('local/')) {
      return `/${url}`;
    }

    return this.hass?.hassUrl ? this.hass.hassUrl(url) : url;
  }

  _getCurrentPosition(stateObj, duration) {
    const basePosition = Number(stateObj.attributes.media_position);
    const updatedAt = stateObj.attributes.media_position_updated_at;

    if (!Number.isFinite(basePosition) || !updatedAt) {
      return 0;
    }

    if (stateObj.state !== 'playing') {
      return Math.max(0, Math.min(duration || basePosition, basePosition));
    }

    const elapsedSeconds = Math.max(0, (this._progressNow - new Date(updatedAt).getTime()) / 1000);
    return Math.max(0, Math.min(duration || basePosition + elapsedSeconds, basePosition + elapsedSeconds));
  }

  _renderSeekSlider({ key, value, duration, label, descriptor, animate, flatten = false }) {
    const clampedValue = Math.max(0, Math.min(Number(duration) || 0, Number(value) || 0));
    const percent = duration > 0 ? Math.max(0, Math.min(100, (clampedValue / duration) * 100)) : 0;
    const gapPx = 8;
    const activeWidth = percent <= 0 ? '0px' : percent >= 100 ? `calc(100% - ${gapPx / 2}px)` : `calc(${percent}% - ${gapPx / 2}px)`;
    const inactiveWidth = percent >= 100 ? '0px' : percent <= 0 ? `calc(100% - ${gapPx / 2}px)` : `calc(${100 - percent}% - ${gapPx / 2}px)`;
    const inactiveLeft = percent >= 100 ? '100%' : `calc(${percent}% + ${gapPx / 2}px)`;

    return html`
      <div
        class="custom-seek-slider ${animate ? 'is-animated' : ''} ${this._activeSeekDrag ? 'is-dragging' : ''} ${flatten ? 'is-flat' : ''}"
        role="slider"
        tabindex=${duration > 0 ? '0' : '-1'}
        aria-label=${label}
        aria-valuemin="0"
        aria-valuemax=${String(duration || 0)}
        aria-valuenow=${String(Math.round(clampedValue))}
        aria-valuetext=${this._formatTime(clampedValue)}
        aria-disabled=${duration <= 0 ? 'true' : 'false'}
        @pointerdown=${(event) => this._startSeekDrag(event, key, descriptor)}
        @keydown=${(event) => this._handleSeekSliderKeydown(event, key, descriptor)}
      >
        <div class="custom-seek-track">
          <div class="custom-seek-fill" style=${`width:${activeWidth};`}>
            ${this._renderSeekWaveSvg(flatten)}
          </div>
          <div class="custom-seek-remaining" style=${`left:${inactiveLeft};width:${inactiveWidth};`}></div>
          <div class="custom-seek-handle" style=${`left:${percent}%;`}></div>
        </div>
      </div>
    `;
  }

  _renderSeekWaveSvg(flatten = false) {
    // The wave is drawn as two identical copies placed side by side (span + span), and the
    // whole SVG slides left by exactly one span (translateX(-50%)) on a loop. Because the
    // wave repeats every SEEK_WAVE_LENGTH px, sliding by a whole multiple of that period looks
    // seamless — but only as long as `span` covers the widest the track can actually render at,
    // otherwise the trailing edge (nearest the handle) runs out of drawn wave mid-loop and pops
    // back to the start. `span` is grown to match the measured track width in
    // _growSeekWaveSpan, so this always holds regardless of card width.
    const span = this._seekWaveSpan || SEEK_WAVE_WIDTH;
    const wavePath = this._buildSeekWavePath(span, flatten ? 0 : SEEK_WAVE_AMPLITUDE);

    return html`
      <svg
        class="custom-seek-wave-svg"
        viewBox=${`0 0 ${span * 2} ${SEEK_WAVE_HEIGHT}`}
        style=${`width:${span * 2}px;height:${SEEK_WAVE_HEIGHT}px;`}
        preserveAspectRatio="xMinYMid slice"
        aria-hidden="true"
      >
        <path
          class="custom-seek-wave-path"
          d=${wavePath}
          transform=${`translate(${span} 0)`}
        ></path>
        <path class="custom-seek-wave-path" d=${wavePath}></path>
      </svg>
    `;
  }

  _buildSeekWavePath(span, amplitude = SEEK_WAVE_AMPLITUDE) {
    const mid = SEEK_WAVE_HEIGHT / 2;
    const segment = SEEK_WAVE_LENGTH / 2;
    let d = `M 0 ${mid}`;

    for (let x = 0; x < span; x += SEEK_WAVE_LENGTH) {
      d += ` Q ${x + segment / 2} ${mid - amplitude}, ${x + segment} ${mid}`;
      d += ` Q ${x + segment + segment / 2} ${mid + amplitude}, ${x + SEEK_WAVE_LENGTH} ${mid}`;
    }

    return d;
  }

  _getDisplayedSeek(key, fallbackValue, duration) {
    return Math.max(0, Math.min(Number(duration) || 0, Number(this._seekPreview[key] ?? fallbackValue) || 0));
  }

  _setSeekPreview(key, value, duration) {
    this._seekPreview = {
      ...this._seekPreview,
      [key]: Math.max(0, Math.min(Number(duration) || 0, Number(value) || 0)),
    };
  }

  _clearSeekPreview(key) {
    if (this._seekPreviewTimers[key]) {
      window.clearTimeout(this._seekPreviewTimers[key]);
      delete this._seekPreviewTimers[key];
    }

    if (!(key in this._seekPreview)) {
      return;
    }

    const nextPreview = { ...this._seekPreview };
    delete nextPreview[key];
    this._seekPreview = nextPreview;
  }

  _holdSeekPreview(key, value, duration) {
    this._setSeekPreview(key, value, duration);
    if (this._seekPreviewTimers[key]) {
      window.clearTimeout(this._seekPreviewTimers[key]);
    }
    this._seekPreviewTimers[key] = window.setTimeout(() => {
      this._clearSeekPreview(key);
    }, SEEK_COMMIT_HOLD_MS);
  }

  _teardownSeekPointerListeners() {
    if (this._activeSeekDrag?.target?.releasePointerCapture && this._activeSeekDrag.pointerId != null) {
      try {
        if (this._activeSeekDrag.target.hasPointerCapture?.(this._activeSeekDrag.pointerId)) {
          this._activeSeekDrag.target.releasePointerCapture(this._activeSeekDrag.pointerId);
        }
      } catch (_error) {
        // Ignore release failures during teardown.
      }
    }

    window.removeEventListener('pointermove', this._seekMoveHandler);
    window.removeEventListener('pointerup', this._seekUpHandler);
    window.removeEventListener('pointercancel', this._seekUpHandler);
    this._activeSeekDrag = null;
  }

  _startSeekDrag(event, key, descriptor) {
    if ((descriptor.duration || 0) <= 0) {
      return;
    }

    const track = event.currentTarget;
    if (!track) {
      return;
    }

    event.preventDefault();

    this._activeSeekDrag = {
      key,
      descriptor,
      rect: track.getBoundingClientRect(),
      pointerId: event.pointerId,
      target: track,
    };

    if (track.setPointerCapture && event.pointerId != null) {
      try {
        track.setPointerCapture(event.pointerId);
      } catch (_error) {
        // Ignore browsers that reject pointer capture for synthetic edge cases.
      }
    }

    window.addEventListener('pointermove', this._seekMoveHandler);
    window.addEventListener('pointerup', this._seekUpHandler);
    window.addEventListener('pointercancel', this._seekUpHandler);

    this._updateSeekDrag(event.clientX);
  }

  _handleSeekPointerMove(event) {
    if (!this._activeSeekDrag) {
      return;
    }

    this._updateSeekDrag(event.clientX);
  }

  async _handleSeekPointerUp(event) {
    if (!this._activeSeekDrag) {
      return;
    }

    const drag = this._activeSeekDrag;
    const position = Number.isFinite(event.clientX)
      ? this._updateSeekDrag(event.clientX)
      : this._getDisplayedSeek(drag.key, drag.descriptor.currentValue ?? 0, drag.descriptor.duration || 0);
    this._teardownSeekPointerListeners();
    this._holdSeekPreview(drag.key, position, drag.descriptor.duration || 0);
    await this._commitSeekChange(drag.key, drag.descriptor, position);
  }

  _updateSeekDrag(clientX) {
    if (!this._activeSeekDrag) {
      return 0;
    }

    const { key, rect, descriptor } = this._activeSeekDrag;
    const duration = Number(descriptor.duration) || 0;
    const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
    const clampedRatio = Math.max(0, Math.min(1, Number.isFinite(ratio) ? ratio : 0));
    const value = duration * clampedRatio;
    this._setSeekPreview(key, value, duration);
    return value;
  }

  async _handleSeekSliderKeydown(event, key, descriptor) {
    const actionKeys = ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End'];
    if (!actionKeys.includes(event.key) || (descriptor.duration || 0) <= 0) {
      return;
    }

    event.preventDefault();

    const duration = Number(descriptor.duration) || 0;
    const current = this._getDisplayedSeek(key, descriptor.currentValue ?? 0, duration);
    const step = Math.max(5, duration / 50);
    let next = current;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      next -= step;
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      next += step;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = duration;
    }

    const clamped = Math.max(0, Math.min(duration, next));
    this._holdSeekPreview(key, clamped, duration);
    await this._commitSeekChange(key, descriptor, clamped);
  }

  async _commitSeekChange(key, descriptor, position) {
    await this._callService('media_player', 'media_seek', {
      entity_id: descriptor.entityId,
      seek_position: Math.max(0, Number(position) || 0),
    });
    this._holdSeekPreview(key, position, descriptor.duration || 0);
  }

  _renderVolumeSlider({ key, value, label, descriptor }) {
    const percent = Math.max(0, Math.min(100, Number(value) || 0));
    const gapPx = 8;
    const activeWidth = percent <= 0 ? '0px' : percent >= 100 ? `calc(100% - ${gapPx / 2}px)` : `calc(${percent}% - ${gapPx / 2}px)`;
    const inactiveWidth = percent >= 100 ? '0px' : percent <= 0 ? `calc(100% - ${gapPx / 2}px)` : `calc(${100 - percent}% - ${gapPx / 2}px)`;
    const inactiveLeft = percent >= 100 ? '100%' : `calc(${percent}% + ${gapPx / 2}px)`;

    return html`
      <div
        class="custom-volume-slider"
        role="slider"
        tabindex="0"
        aria-label=${label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${String(percent)}
        aria-valuetext=${`${percent}%`}
        @pointerdown=${(event) => this._startVolumeDrag(event, key, descriptor)}
        @keydown=${(event) => this._handleVolumeSliderKeydown(event, key, descriptor)}
      >
        <div class="custom-volume-track">
          <div class="custom-volume-fill" style=${`width:${activeWidth};`}></div>
          <div class="custom-volume-remaining" style=${`left:${inactiveLeft};width:${inactiveWidth};`}></div>
          <div class="custom-volume-handle" style=${`left:${percent}%;`}></div>
        </div>
      </div>
    `;
  }

  _getDisplayedVolume(key, fallbackValue) {
    return Math.max(0, Math.min(100, Number(this._volumePreview[key] ?? fallbackValue) || 0));
  }

  _setVolumePreview(key, value) {
    this._volumePreview = {
      ...this._volumePreview,
      [key]: Math.max(0, Math.min(100, Number(value) || 0)),
    };
  }

  _clearVolumePreview(key) {
    if (!(key in this._volumePreview)) {
      return;
    }

    const nextPreview = { ...this._volumePreview };
    delete nextPreview[key];
    this._volumePreview = nextPreview;
  }

  _teardownVolumePointerListeners() {
    if (this._activeVolumeDrag?.target?.releasePointerCapture && this._activeVolumeDrag.pointerId != null) {
      try {
        if (this._activeVolumeDrag.target.hasPointerCapture?.(this._activeVolumeDrag.pointerId)) {
          this._activeVolumeDrag.target.releasePointerCapture(this._activeVolumeDrag.pointerId);
        }
      } catch (_error) {
        // Ignore release failures during teardown.
      }
    }

    window.removeEventListener('pointermove', this._volumeMoveHandler);
    window.removeEventListener('pointerup', this._volumeUpHandler);
    window.removeEventListener('pointercancel', this._volumeUpHandler);
    this._activeVolumeDrag = null;
  }

  _startVolumeDrag(event, key, descriptor) {
    const track = event.currentTarget;
    if (!track) {
      return;
    }

    event.preventDefault();

    this._activeVolumeDrag = {
      key,
      descriptor,
      rect: track.getBoundingClientRect(),
      pointerId: event.pointerId,
      target: track,
    };

    if (track.setPointerCapture && event.pointerId != null) {
      try {
        track.setPointerCapture(event.pointerId);
      } catch (_error) {
        // Ignore browsers that reject pointer capture for synthetic edge cases.
      }
    }

    window.addEventListener('pointermove', this._volumeMoveHandler);
    window.addEventListener('pointerup', this._volumeUpHandler);
    window.addEventListener('pointercancel', this._volumeUpHandler);

    this._updateVolumeDrag(event.clientX);
  }

  _handleVolumePointerMove(event) {
    if (!this._activeVolumeDrag) {
      return;
    }

    this._updateVolumeDrag(event.clientX);
  }

  async _handleVolumePointerUp(event) {
    if (!this._activeVolumeDrag) {
      return;
    }

    const drag = this._activeVolumeDrag;
    const percent = Number.isFinite(event.clientX)
      ? this._updateVolumeDrag(event.clientX)
      : this._getDisplayedVolume(drag.key, drag.descriptor.currentValue ?? 0);
    this._teardownVolumePointerListeners();
    await this._commitVolumeChange(drag.descriptor, percent);
    this._clearVolumePreview(drag.key);
  }

  _updateVolumeDrag(clientX) {
    if (!this._activeVolumeDrag) {
      return 0;
    }

    const { key, rect } = this._activeVolumeDrag;
    const percent = Math.round(((clientX - rect.left) / rect.width) * 100);
    const clamped = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));
    this._setVolumePreview(key, clamped);
    return clamped;
  }

  async _handleVolumeSliderKeydown(event, key, descriptor) {
    const actionKeys = ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End'];
    if (!actionKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const current = this._getDisplayedVolume(key, descriptor.currentValue ?? 0);
    let next = current;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      next -= 5;
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      next += 5;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = 100;
    }

    const clamped = Math.max(0, Math.min(100, next));
    this._setVolumePreview(key, clamped);
    await this._commitVolumeChange(descriptor, clamped);
    this._clearVolumePreview(key);
  }

  async _commitVolumeChange(descriptor, percent) {
    const volumeLevel = Math.max(0, Math.min(1, Number(percent) / 100));

    if (descriptor.type === 'player' || descriptor.type === 'speaker') {
      await this._callService('media_player', 'volume_set', {
        entity_id: descriptor.entityId,
        volume_level: volumeLevel,
      });
      return;
    }

    if (descriptor.type === 'group') {
      const targetLevels = computeProportionalGroupVolumes(descriptor.levels || [], percent);
      for (const level of targetLevels) {
        await this._callService('media_player', 'volume_set', {
          entity_id: level.entityId,
          volume_level: Math.max(0, Math.min(1, Number(level.volumePercent) / 100)),
        });
      }
    }
  }

  async _setShuffle(entityId, shuffle) {
    await this._callService('media_player', 'shuffle_set', {
      entity_id: entityId,
      shuffle,
    });
  }

  async _cycleRepeat(entityId, currentMode) {
    const currentIndex = REPEAT_MODES.indexOf(currentMode);
    const nextMode = REPEAT_MODES[(currentIndex + 1 + REPEAT_MODES.length) % REPEAT_MODES.length];

    await this._callService('media_player', 'repeat_set', {
      entity_id: entityId,
      repeat: nextMode,
    });
  }

  _formatTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
      return '0:00';
    }

    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  _sliderStyle(percent) {
    return `--range-fill:${Math.max(0, Math.min(100, Number(percent) || 0))}%;`;
  }

  async _callService(domain, service, data) {
    return this.hass.callService(domain, service, data);
  }


  static get styles() {
    return cardStyles;
  }
}

customElements.define('mysmart-music-control', MySmartMusicControl);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mysmart-music-control',
  name: 'MySmart Music Control',
  description: 'A Sonos-focused music control card with stream tabs, grouping, volumes, and favorites.',
});
