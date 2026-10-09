import { LitElement, html, nothing } from 'lit';

import {
  FAVORITE_FILTER_ALL,
  FAVORITE_FILTER_ALBUM,
  FAVORITE_FILTER_PLAYLIST,
  FAVORITE_FILTER_RADIO,
} from './mysmart-music-control-helpers.js';
import { translateCardString } from './mysmart-music-control-i18n.js';

const FAVORITE_VIEW_GRID = 'grid';
const FAVORITE_VIEW_TILES = 'tiles';
const FAVORITE_PLAYBACK_FEEDBACK_MS = 600;

class MySmartMusicControlFavorites extends LitElement {
  static get properties() {
    return {
      hass: {},
      activeStream: { attribute: false },
      favorites: { attribute: false },
      view: {},
      _favoriteSearch: { state: true },
      _favoriteFilter: { state: true },
      _isFilterOpen: { state: true },
      _imageFailures: { state: true },
      _visibleImages: { state: true },
      _playingFavoriteId: { state: true },
      _playbackError: { state: true },
    };
  }

  constructor() {
    super();
    this.activeStream = null;
    this.favorites = [];
    this.view = 'list';
    this._favoriteSearch = '';
    this._favoriteFilter = FAVORITE_FILTER_ALL;
    this._isFilterOpen = false;
    this._imageFailures = {};
    this._visibleImages = {};
    this._playingFavoriteId = '';
    this._playbackError = '';
    this._imageObserver = null;
    this._imageVisibilityQueue = new Set();
    this._imageVisibilityFrame = 0;
  }

  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownImageObserver();
    if (this._imageVisibilityFrame) {
      window.cancelAnimationFrame(this._imageVisibilityFrame);
      this._imageVisibilityFrame = 0;
    }
  }

  updated() {
    this._observeImages();
  }

  _t(key, params = {}) {
    return translateCardString(this.hass, key, params);
  }

  render() {
    const favorites = this._getVisibleFavorites();
    const playbackPending = Boolean(this._playingFavoriteId);
    const gridView = this.view === FAVORITE_VIEW_GRID;
    const tileView = this.view === FAVORITE_VIEW_TILES;
    const searchInput = html`
      <input
        class="search-input"
        type="search"
        placeholder=${this._t('search_favorites')}
        .value=${this._favoriteSearch}
        @input=${(event) => { this._favoriteSearch = event.target.value || ''; }}
      />
    `;

    return html`
      <div class="panel panel-tight favorite-panel">
        <div class="favorite-toolbar ${this._isFilterOpen ? 'filters-open' : ''}">
          <button
            class="filter-toggle ${this._favoriteSearch.trim() || this._favoriteFilter !== FAVORITE_FILTER_ALL ? 'active' : ''}"
            title=${this._t(this._isFilterOpen ? 'close' : 'filter')}
            aria-label=${this._t(this._isFilterOpen ? 'close' : 'filter')}
            aria-expanded=${this._isFilterOpen ? 'true' : 'false'}
            @click=${() => { this._isFilterOpen = !this._isFilterOpen; }}
          >
            <ha-icon icon=${this._isFilterOpen ? 'mdi:close' : 'mdi:filter-variant'}></ha-icon>
            <span>${this._t('filter')}</span>
          </button>
          ${tileView ? html`
            <label class="search-field">
              <ha-icon icon="mdi:magnify" aria-hidden="true"></ha-icon>
              ${searchInput}
            </label>
          ` : searchInput}
          <div class="favorite-toolbar-row">
            <div class="filter-pills">
              ${this._favoriteFilterOptions().map((option) => html`
                <button
                  class="filter-pill ${this._favoriteFilter === option.value ? 'active' : ''}"
                  @click=${() => { this._favoriteFilter = option.value; }}
                >
                  ${option.label}
                </button>
              `)}
            </div>
          </div>
        </div>

        ${this._playbackError ? html`
          <div class="favorite-playback-error" role="alert">
            <ha-icon icon="mdi:alert-circle-outline" aria-hidden="true"></ha-icon>
            <span>${this._playbackError}</span>
          </div>
        ` : nothing}

        ${favorites.length === 0 ? html`
          <div class="empty-state small">
            <ha-icon icon="mdi:star-outline"></ha-icon>
            <div>${this._t('no_favorites_match')}</div>
          </div>
        ` : html`
          <div class="favorite-list ${gridView ? 'favorite-list-grid' : ''} ${tileView ? 'favorite-list-tiles' : ''}">
            ${favorites.map((favorite) => {
              const isStarting = favorite.mediaId === this._playingFavoriteId;
              const hasArtwork = Boolean(favorite.image && !this._imageFailures[favorite.mediaId]);
              return html`
                <button
                  class="favorite-item ${gridView ? 'favorite-item-grid' : ''} ${tileView ? 'favorite-item-tile' : ''} ${tileView && hasArtwork ? 'has-artwork' : ''} ${isStarting ? 'is-starting' : ''}"
                  aria-label=${tileView ? favorite.name : nothing}
                  aria-busy=${isStarting ? 'true' : 'false'}
                  ?disabled=${playbackPending}
                  @click=${() => this._playFavorite(favorite)}
                >
                  <div class="favorite-art ${hasArtwork ? 'has-artwork' : ''} ${gridView ? 'favorite-art-grid' : ''} ${tileView ? 'favorite-art-tile' : ''}">
                    ${favorite.image && !this._imageFailures[favorite.mediaId] ? html`
                      ${this._shouldLoadImage(favorite.mediaId) ? html`
                        <img
                          class="favorite-art-image"
                          data-favorite-image
                          data-media-id=${favorite.mediaId}
                          src=${favorite.image}
                          alt=${favorite.name}
                          loading="lazy"
                          @error=${() => this._handleImageError(favorite.mediaId)}
                        />
                      ` : html`
                        <div class="favorite-art-placeholder" data-favorite-image data-media-id=${favorite.mediaId}>
                          <ha-icon icon=${this._favoriteTypeIcon(favorite.type)}></ha-icon>
                        </div>
                      `}
                    ` : html`<ha-icon icon=${this._favoriteTypeIcon(favorite.type)}></ha-icon>`}
                    ${isStarting ? html`
                      <span class="favorite-loading-indicator" aria-hidden="true">
                        <ha-icon icon="mdi:loading"></ha-icon>
                      </span>
                    ` : nothing}
                  </div>
                  ${tileView && !hasArtwork ? html`
                    <div class="favorite-copy favorite-copy-tile" aria-hidden="true">
                      <div class="favorite-name">${favorite.name}</div>
                    </div>
                  ` : nothing}
                  ${gridView || tileView ? nothing : html`
                    <div class="favorite-copy">
                      <div class="favorite-name">${favorite.name}</div>
                      <div class="favorite-meta">${favorite.typeLabel}</div>
                    </div>
                  `}
                  ${gridView || tileView ? nothing : html`<ha-icon class="favorite-chevron" icon="mdi:play-circle"></ha-icon>`}
                </button>
              `;
            })}
          </div>
        `}
      </div>
    `;
  }

  _getVisibleFavorites() {
    const search = this._favoriteSearch.trim().toLowerCase();
    return (this.favorites || []).filter((favorite) => {
      const matchesFilter = this._favoriteFilter === FAVORITE_FILTER_ALL || favorite.type === this._favoriteFilter;
      const matchesSearch = !search
        || favorite.name.toLowerCase().includes(search)
        || favorite.typeLabel.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });
  }

  _favoriteFilterOptions() {
    return [
      { value: FAVORITE_FILTER_ALL, label: this._t('all') },
      { value: FAVORITE_FILTER_ALBUM, label: this._t('albums') },
      { value: FAVORITE_FILTER_PLAYLIST, label: this._t('playlists') },
      { value: FAVORITE_FILTER_RADIO, label: this._t('radio') },
    ];
  }

  _favoriteTypeIcon(type) {
    if (type === FAVORITE_FILTER_ALBUM) return 'mdi:album';
    if (type === FAVORITE_FILTER_PLAYLIST) return 'mdi:playlist-music';
    if (type === FAVORITE_FILTER_RADIO) return 'mdi:radio';
    return 'mdi:music-note-outline';
  }

  _handleImageError(mediaId) {
    if (!mediaId || this._imageFailures[mediaId]) return;
    this._imageFailures = { ...this._imageFailures, [mediaId]: true };
  }

  _shouldLoadImage(mediaId) {
    return Boolean(mediaId && this._visibleImages[mediaId]);
  }

  _markImageVisible(mediaId) {
    if (!mediaId || this._visibleImages[mediaId]) return;
    this._imageVisibilityQueue.add(mediaId);
    if (this._imageVisibilityFrame) return;
    this._imageVisibilityFrame = window.requestAnimationFrame(() => {
      this._imageVisibilityFrame = 0;
      if (!this._imageVisibilityQueue.size) return;
      const nextVisible = { ...this._visibleImages };
      let changed = false;
      for (const queuedMediaId of this._imageVisibilityQueue) {
        if (!nextVisible[queuedMediaId]) {
          nextVisible[queuedMediaId] = true;
          changed = true;
        }
      }
      this._imageVisibilityQueue.clear();
      if (changed) this._visibleImages = nextVisible;
    });
  }

  _observeImages() {
    if (typeof window === 'undefined') return;
    const nodes = this.querySelectorAll('[data-favorite-image][data-media-id]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => this._markImageVisible(node.dataset.mediaId || ''));
      return;
    }
    if (!this._imageObserver) {
      this._imageObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const mediaId = entry.target?.dataset?.mediaId || '';
          this._markImageVisible(mediaId);
          this._imageObserver?.unobserve(entry.target);
        }
      }, { root: null, rootMargin: '120px 0px', threshold: 0.01 });
    }
    nodes.forEach((node) => {
      const mediaId = node.dataset.mediaId || '';
      if (this._visibleImages[mediaId]) {
        this._imageObserver?.unobserve(node);
      } else {
        this._imageObserver.observe(node);
      }
    });
  }

  _teardownImageObserver() {
    this._imageObserver?.disconnect();
    this._imageObserver = null;
  }

  async _playFavorite(favorite) {
    if (this._playingFavoriteId || !this.activeStream) return;
    const feedbackStartedAt = Date.now();
    const entityId = this.activeStream.coordinator;
    const currentShuffle = this.activeStream.stateObj?.attributes?.shuffle === true;
    this._playingFavoriteId = favorite.mediaId;
    this._playbackError = '';
    try {
      if (favorite.type === FAVORITE_FILTER_ALBUM && currentShuffle) {
        await this.hass.callService('media_player', 'shuffle_set', { entity_id: entityId, shuffle: false });
      }
      await this.hass.callService('media_player', 'play_media', {
        entity_id: entityId,
        media_content_type: favorite.media_content_type || 'favorite_item_id',
        media_content_id: favorite.media_content_id || favorite.mediaId,
      });
      const remainingFeedbackMs = FAVORITE_PLAYBACK_FEEDBACK_MS - (Date.now() - feedbackStartedAt);
      if (remainingFeedbackMs > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingFeedbackMs));
      }
      this.dispatchEvent(new CustomEvent('favorite-played', { bubbles: true, composed: true }));
    } catch (error) {
      console.warn('[mysmart-music-control] Failed to play favorite', error);
      this._playbackError = this._t('favorite_playback_failed', { name: favorite.name });
    } finally {
      this._playingFavoriteId = '';
    }
  }
}

if (!customElements.get('mysmart-music-control-favorites')) {
  customElements.define('mysmart-music-control-favorites', MySmartMusicControlFavorites);
}
