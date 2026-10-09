import { LitElement, html, css } from 'lit';

import {
  DISPLAY_MODE_COMPACT,
  DISPLAY_MODE_FULL,
  DISPLAY_MODE_MINIMAL,
  DISPLAY_MODE_TABLET,
} from './mysmart-music-control-helpers.js';
import { translateCardString } from './mysmart-music-control-i18n.js';

class MySmartMusicControlEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: { state: true },
    };
  }

  setConfig(config) {
    this._config = {
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
      browse_view: 'list',
      display_mode: DISPLAY_MODE_FULL,
      height: '',
      start_collapsed: false,
      show_title: true,
      show_artwork: true,
      show_speaker_pill: true,
      show_album_title: true,
      show_seekbar: true,
      show_volume: true,
      ...config,
    };
  }

  _t(key, params) {
    return translateCardString(this.hass, key, params);
  }

  _emitConfig(nextConfig) {
    this._config = nextConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: nextConfig },
      bubbles: true,
      composed: true,
    }));
  }

  _valueChanged(event) {
    const target = event.target;
    const key = target?.configValue;
    if (!key) {
      return;
    }

    let value = event.detail?.value ?? target.value;

    if (target.type === 'checkbox' || target.localName === 'ha-switch') {
      value = target.checked;
    }

    const nextConfig = { ...(this._config || {}) };

    if (
      value === ''
      || value == null
      || (Array.isArray(value) && value.length === 0)
      || (key === 'browse_view' && value === 'list')
      || (key === 'display_mode' && value === DISPLAY_MODE_FULL)
      || (key === 'start_collapsed' && value === false)
      || (key === 'always_show_stream_selector' && value === false)
      || (key === 'show_title' && value === true)
      || (key === 'show_artwork' && value === true)
      || (key === 'show_speaker_pill' && value === true)
      || (key === 'show_album_title' && value === true)
      || (key === 'show_seekbar' && value === true)
      || (key === 'show_volume' && value === true)
    ) {
      delete nextConfig[key];
    } else {
      nextConfig[key] = value;
    }

    this._emitConfig(nextConfig);
  }

  _renderToggle(label, key) {
    return html`
      <ha-formfield .label=${label}>
        <ha-switch
          .checked=${this._config?.[key] !== false}
          .configValue=${key}
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="editor">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: 'media_player', multiple: true } }}
          .value=${this._config?.entities || []}
          .configValue=${'entities'}
          .label=${this._t('sonos_speakers')}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: 'sensor' } }}
          .value=${this._config?.favorites_entity || ''}
          .configValue=${'favorites_entity'}
          .label=${this._t('favorites_sensor')}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              mode: 'dropdown',
              options: [
                { value: DISPLAY_MODE_FULL, label: this._t('display_mode_full') },
                { value: DISPLAY_MODE_COMPACT, label: this._t('display_mode_compact') },
                { value: DISPLAY_MODE_MINIMAL, label: this._t('display_mode_minimal') },
                { value: DISPLAY_MODE_TABLET, label: this._t('display_mode_tablet') },
              ],
            },
          }}
          .value=${this._config?.display_mode || DISPLAY_MODE_FULL}
          .configValue=${'display_mode'}
          .label=${this._t('display_mode')}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-input
          .value=${this._config?.height || ''}
          .configValue=${'height'}
          .label=${this._t('height')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.title || ''}
          .configValue=${'title'}
          .label=${this._t('card_title')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.card_background || ''}
          .configValue=${'card_background'}
          .label=${this._t('card_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.active_color || this._config?.accent_color || ''}
          .configValue=${'active_color'}
          .label=${this._t('active_color')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.tab_background || ''}
          .configValue=${'tab_background'}
          .label=${this._t('tab_row_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.tab_border_color || ''}
          .configValue=${'tab_border_color'}
          .label=${this._t('tab_row_border')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.inactive_button_background || ''}
          .configValue=${'inactive_button_background'}
          .label=${this._t('inactive_surface_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.inactive_tab_button_background || ''}
          .configValue=${'inactive_tab_button_background'}
          .label=${this._t('inactive_tab_button_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.stream_selector_active_color || ''}
          .configValue=${'stream_selector_active_color'}
          .label=${this._t('stream_selector_active_color')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.slider_remaining || ''}
          .configValue=${'slider_remaining'}
          .label=${this._t('slider_remaining_color')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.player_button_background || ''}
          .configValue=${'player_button_background'}
          .label=${this._t('player_button_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.play_button_background || ''}
          .configValue=${'play_button_background'}
          .label=${this._t('play_button_background')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.play_button_icon_color || ''}
          .configValue=${'play_button_icon_color'}
          .label=${this._t('play_button_icon_color')}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              mode: 'dropdown',
              options: [
                { value: 'list', label: this._t('browse_default_list') },
                { value: 'grid', label: this._t('browse_default_grid') },
              ],
            },
          }}
          .value=${this._config?.browse_view || 'list'}
          .configValue=${'browse_view'}
          .label=${this._t('browse_default_view')}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <div class="toggles">
          <ha-formfield .label=${this._t('always_show_stream_selector')}>
            <ha-switch
              .checked=${this._config?.always_show_stream_selector === true}
              .configValue=${'always_show_stream_selector'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield .label=${this._t('start_collapsed')}>
            <ha-switch
              .checked=${this._config?.start_collapsed === true}
              .configValue=${'start_collapsed'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          ${this._renderToggle(this._t('show_track_title'), 'show_title')}
          ${this._renderToggle(this._t('show_album_art'), 'show_artwork')}
          ${this._renderToggle(this._t('show_speaker_pill'), 'show_speaker_pill')}
          ${this._renderToggle(this._t('show_album_title'), 'show_album_title')}
          ${this._renderToggle(this._t('show_seekbar'), 'show_seekbar')}
          ${this._renderToggle(this._t('show_volume'), 'show_volume')}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: grid;
        gap: 16px;
        padding: 8px 0 16px;
      }

      .toggles {
        display: grid;
        gap: 10px;
      }
    `;
  }
}

customElements.define('mysmart-music-control-editor', MySmartMusicControlEditor);
