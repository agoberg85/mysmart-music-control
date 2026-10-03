import { css } from 'lit';

const SEEK_WAVE_STROKE = 3;

export const cardStyles = css`
      mysmart-music-control-favorites {
        display: contents;
      }

      :host {
        display: block;
        --mysmart-music-card-accent: var(--accent-color, #ff8b5e);
        --mysmart-music-card-background: var(--ha-card-background, var(--card-background-color, #ffffff));
        --mysmart-music-card-ink: var(--primary-text-color, #171313);
        --mysmart-music-card-muted: var(--secondary-text-color, rgba(23, 19, 19, 0.62));
        --mysmart-music-card-surface: rgba(255, 255, 255, 0.72);
        --mysmart-music-card-tab-background: rgba(255, 255, 255, 0.5);
        --mysmart-music-card-button-surface: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-tab-button-surface: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-player-button-background: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-play-button-background: var(--mysmart-music-card-accent);
        --mysmart-music-card-play-button-icon-color: #ffffff;
        --mysmart-music-card-stream-selector-active-color: var(--primary-text-color, #ffffff);
        --mysmart-music-card-tab-border-color: transparent;
        --mysmart-music-card-slider-remaining: rgba(255, 255, 255, 0.62);
        --mysmart-music-card-checkbox-border: rgba(255, 255, 255, 0.16);
      }

      ha-card.shell {
        position: relative;
        overflow: hidden;
        border: 0;
        border-radius: 32px;
        background: var(--mysmart-music-card-background);
        box-shadow: none;
        height: var(--mysmart-music-card-height, auto);
      }

      .content {
        display: grid;
        gap: 20px;
        padding: 22px;
        color: var(--mysmart-music-card-ink);
      }

      .content.has-fixed-height {
        box-sizing: border-box;
        height: 100%;
        grid-template-rows: auto minmax(0, 1fr);
        overflow: hidden;
      }

      .top-shell {
        display: grid;
        gap: 20px;
        min-height: 0;
      }

      .top-shell-fixed {
        min-height: 0;
      }

      .body-shell {
        min-height: 0;
      }

      .body-shell-scroll {
        overflow: auto;
        padding-right: 2px;
        padding-bottom: 0;
        box-sizing: border-box;
      }

      .header,
      .group-actions,
      .time-row,
      .transport-row,
      .screen-tabs,
      .stream-pills,
      .volume-slider-row,
      .filter-pills,
      .favorite-toolbar-row {
        display: flex;
        align-items: center;
      }

      .header,
      .time-row {
        justify-content: space-between;
      }
      .group-actions {justify-content: start;}

      .header,
      .favorite-toolbar,
      .volume-master,
      .volume-item,
      .player-layout,
      .panel,
      .group-list,
      .favorite-list,
      .volume-list,
      .meta {
        display: grid;
      }

      .header {
        gap: 16px;
      }

      .header-no-title {
        gap: 0;
      }

      .favorite-toolbar,
      .volume-master,
      .volume-item,
      .player-layout,
      .panel,
      .group-list,
      .favorite-list,
      .volume-list,
      .meta {
        gap: 12px;
      }

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .stream-pills,
      .screen-tabs,
      .filter-pills {
        gap: 8px;
        flex-wrap: wrap;
      }

      .favorite-toolbar-row {
        justify-content: space-between;
        gap: 12px;
      }

      button,
      input {
        font: inherit;
      }

      button {
        color: inherit;
        cursor: pointer;
      }

      .stream-pill,
      .screen-tab,
      .secondary-button,
      .primary-button,
      .icon-button,
      .play-button,
      .favorite-item,
      .filter-pill,
      .search-input,
      .view-toggle {
        border: 0;
      }

      .stream-pill,
      .screen-tab,
      .secondary-button,
      .primary-button,
      .filter-pill,
      .search-input,
      .view-toggle {
        border-radius: 999px;
      }

      .screen-tab {
        background: var(--mysmart-music-card-tab-button-surface);
      }

      .stream-pill {
        background: transparent;
      }

      .secondary-button,
      .filter-pill,
      .view-toggle,
      .group-item,
      .favorite-item,
      .volume-item,
      .volume-master {
        background: var(--mysmart-music-card-button-surface);
      }

      .stream-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 2px 0px;
        border-radius: 0;
        border: 0;
        color: var(--mysmart-music-card-muted);
      }

      .stream-pill-content {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding-bottom: 6px;
        border-bottom: 2px solid transparent;
      }

      .stream-pill-icon-slot {
        width: 12px;
        min-width: 12px;
        height: 12px;
        display: inline-grid;
        place-items: center;
        align-self: center;
        transform: translateY(-4px);
      }

      .stream-pill-bars {
        width: 10px;
        height: 10px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }

      .stream-pill-bars span {
        width: 2px;
        height: 100%;
        border-radius: 999px;
        background: currentColor;
        transform-origin: bottom;
        animation: stream-bars-bounce 1.8s ease-in-out infinite alternate;
      }

      .stream-pill-bars span:nth-child(2) {
        animation-delay: -1.8s;
      }

      .stream-pill-bars span:nth-child(3) {
        animation-delay: -1.1s;
      }

      .stream-pill.is-playing:not(.active) {
        color: var(--mysmart-music-card-ink);
      }

      .stream-pill.active {
        background-image: none;
        background-color: transparent;
        color: var(--mysmart-music-card-stream-selector-active-color);
      }

      .stream-pill-label {
        padding-bottom: 2px;
        border-bottom: 2px solid transparent;
      }

      .stream-pill.active.has-indicator .stream-pill-content {
        border-bottom-color: var(--mysmart-music-card-stream-selector-active-color);
      }

      .stream-pill.active.has-indicator .stream-pill-label {
        border-bottom-color: transparent;
      }

      .stream-pill.active:not(.has-indicator) .stream-pill-label {
        border-bottom-color: var(--mysmart-music-card-stream-selector-active-color);
      }

      @keyframes stream-bars-bounce {
        10% {
          transform: scaleY(0.3);
        }

        30% {
          transform: scaleY(1);
        }

        60% {
          transform: scaleY(0.45);
        }

        80% {
          transform: scaleY(0.75);
        }

        100% {
          transform: scaleY(0.6);
        }
      }

      .screen-tab.active,
      .primary-button,
      .icon-button.active,
      .filter-pill.active {
        background: var(--mysmart-music-card-accent);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .track-album,
      .group-item-meta,
      .favorite-meta,
      .time-row,
      .volume-value {
        color: var(--mysmart-music-card-muted);
      }

      .stream-pill-label,
      .group-item-name,
      .favorite-name {
        font-size: var(--ha-font-size-m);
      }

      .stream-pills {
        gap: 14px;
        align-items: flex-end;
      }

      .screen-tabs {
        display: inline-flex;
        max-width: 100%;
        padding: 4px;
        border-radius: 999px;
        background: var(--mysmart-music-card-tab-background);
        border: 1px solid var(--mysmart-music-card-tab-border-color);
      }

      .screen-tab {
        padding: 8px 16px;
        font-size: var(--ha-font-size-m);
        flex-grow: 1;
      }

      .player-layout,
      .panel {
        gap: 16px;
      }

      .panel-tight {
        padding: 0;
        background: transparent;
      }

      .compact-player {
        gap: 14px;
      }

      .artwork-shell {
        width: min(100%, 280px);
        aspect-ratio: 1;
        margin: 0 auto;
        border-radius: 32px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }

      .artwork-shell ha-icon {
        font-size: 88px;
        color: var(--mysmart-music-card-muted);
      }

      .meta {
        text-align: center;
        gap: 4px;
      }

      .meta-chip {
        justify-self: center;
        padding: 7px 12px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        color: var(--mysmart-music-card-muted);
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .track-title {
        font-size: 2em;
        line-height: 1.1;
        font-weight: 300;
      }

      .track-subtitle {
        font-size: 16px;
        font-weight: 500;
      }

      .progress-block,
      .volume-block {
        display: grid;
        gap: 6px;
      }

      .time-row {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .custom-seek-slider {
        width: 100%;
        min-height: 20px;
        display: grid;
        align-items: center;
        cursor: pointer;
        touch-action: none;
        outline: none;
      }

      .custom-seek-slider[aria-disabled='true'] {
        cursor: default;
        opacity: 0.7;
      }

      .custom-seek-track {
        position: relative;
        width: 100%;
        height: 24px;
      }

      .custom-seek-fill,
      .custom-seek-remaining {
        position: absolute;
        top: 50%;
        border-radius: 999px;
        transform: translateY(-50%);
      }

      .custom-seek-fill {
        left: 0;
        height: 24px;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.92);
      }

      .custom-seek-wave-svg {
        display: block;
        max-width: none;
      }

      .custom-seek-wave-path {
        fill: none;
        stroke: currentColor;
        stroke-width: ${SEEK_WAVE_STROKE};
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .custom-seek-slider.is-animated .custom-seek-wave-svg {
        animation: seek-wave-slide 15s linear infinite;
      }

      .custom-seek-slider.is-dragging .custom-seek-wave-svg,
      .custom-seek-slider:not(.is-animated) .custom-seek-wave-svg {
        animation-play-state: paused;
      }

      .custom-seek-remaining {
        height: 4px;
        background: var(--mysmart-music-card-slider-remaining);
      }

      .custom-seek-handle {
        position: absolute;
        top: 50%;
        width: 4px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .custom-seek-slider:focus-visible .custom-seek-handle {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      @keyframes seek-wave-slide {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      .custom-volume-slider {
        width: 100%;
        min-height: 20px;
        display: grid;
        align-items: center;
        cursor: pointer;
        touch-action: none;
        outline: none;
      }

      .custom-volume-track {
        position: relative;
        width: 100%;
        height: 4px;
      }

      .custom-volume-fill,
      .custom-volume-remaining {
        position: absolute;
        top: 0;
        height: 100%;
        border-radius: 999px;
      }

      .custom-volume-fill {
        left: 0;
        background: var(--mysmart-music-card-accent);
      }

      .custom-volume-remaining {
        background: var(--mysmart-music-card-slider-remaining);
      }

      .custom-volume-handle {
        position: absolute;
        top: 50%;
        width: 4px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .custom-volume-slider:focus-visible .custom-volume-handle {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .transport-row {
        justify-content: center;
        gap: 12px;
        margin-top: 0px;
        margin-bottom: 18px;
      }

      .icon-button,
      .play-button {
        display: grid;
        place-items: center;
        border-radius: 999px;
      }

      .icon-button {
        width: 46px;
        height: 46px;
        background: var(--mysmart-music-card-player-button-background);
      }

      .play-button {
        width: 68px;
        height: 68px;
        background: var(--mysmart-music-card-play-button-background);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .panel {
        border-radius: 28px;
      }

      .group-list,
      .favorite-list,
      .volume-list {
        display: grid;
        gap: 10px;
      }

      .favorite-list-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .group-item,
      .favorite-item,
      .volume-item,
      .volume-master {
        align-items: center;
        gap: 14px;
        padding: 14px;
        border-radius: 20px;
      }

      .group-item {
        position: relative;
        display: grid;
        grid-template-columns: auto auto 1fr auto;
      }


      .group-item-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      .group-item-checkbox {
        width: 18px;
        height: 18px;
        border: 1px solid var(--mysmart-music-card-checkbox-border);
        border-radius: 6px;
        background: var(--mysmart-music-card-button-surface);
        display: inline-grid;
        place-items: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px 12px;
      }

      .group-item-input:checked + .group-item-checkbox {
        border-color: transparent;
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M6.3 11.2 3.1 8l-1.1 1.1 4.3 4.3L14 5.7l-1.1-1.1z'/%3E%3C/svg%3E");
        background-color: var(--mysmart-music-card-accent);
      }

      .group-item-input:disabled + .group-item-checkbox {
        opacity: 0.72;
      }

      .group-status.live {
        padding: 3px 8px;
        border-radius: 999px;
        font-size: 11px;
        line-height: 1.1;
        font-weight: 700;
        color: var(--mysmart-music-card-play-button-icon-color);
        background: var(--mysmart-music-card-accent);
        justify-self: end;
      }

      .group-actions {
        gap: 10px;
        flex-wrap: wrap;
      }

      .secondary-button,
      .primary-button,
      .filter-pill {
        padding: 6px 16px;
        font-size: var(--ha-font-size-m);
      }

      .view-toggle {
        width: 40px;
        height: 40px;
        display: inline-grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .primary-button[disabled],
      .secondary-button[disabled] {
        opacity: 0.6;
        cursor: default;
      }

      .favorite-item {
        width: 100%;
        display: grid;
        grid-template-columns: 54px 1fr auto;
        text-align: left;
      }

      .favorite-item-grid {
        grid-template-columns: 1fr;
        padding: 0;
        background: transparent;
      }

      .favorite-item[disabled] {
        cursor: wait;
      }

      .favorite-item[disabled]:not(.is-starting) {
        opacity: 0.55;
      }

      .favorite-item.is-starting .favorite-art {
        animation: favorite-thumbnail-pulse 900ms ease-in-out infinite alternate;
      }

      .favorite-playback-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: var(--mysmart-music-card-button-surface);
        font-size: 14px;
        font-weight: 500;
      }

      .favorite-playback-error {
        color: var(--error-color, #db4437);
      }

      @keyframes favorite-thumbnail-pulse {
        from { filter: brightness(0.72); transform: scale(0.96); }
        to { filter: brightness(1.08); transform: scale(1); }
      }

      @keyframes favorite-loading-spin {
        to { transform: rotate(360deg); }
      }

      .favorite-art {
        position: relative;
        width: 54px;
        height: 54px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        overflow: hidden;
        background: var(--mysmart-music-card-tab-background);
      }

      .favorite-art-grid {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        border-radius: 24px;
      }

      .favorite-art-image,
      .favorite-art-placeholder {
        width: 100%;
        height: 100%;
        display: block;
      }

      .favorite-art-image {
        object-fit: cover;
      }

      .favorite-loading-indicator {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.38);
        backdrop-filter: blur(2px);
      }

      .favorite-loading-indicator ha-icon {
        animation: favorite-loading-spin 850ms linear infinite;
      }

      .favorite-art-placeholder {
        display: grid;
        place-items: center;
      }

      .favorite-art ha-icon,
      .favorite-chevron {
        color: var(--mysmart-music-card-muted);
      }

      .group-item-meta,
      .favorite-meta {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .search-input {
        width: 100%;
        padding: 12px 16px;
        color: var(--mysmart-music-card-ink);
        background: var(--mysmart-music-card-button-surface);
        outline: none;
        font-size: 14px;
        font-weight: 500;
      }

      .volume-slider-row {
        gap: 12px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
      }

      .volume-value {
        min-width: 44px;
        text-align: right;
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .empty-state {
        display: grid;
        gap: 10px;
        padding: 28px 14px;
        place-items: center;
        text-align: center;
        color: var(--mysmart-music-card-muted);
      }

      .empty-state.small {
        padding: 18px 8px;
      }

      .empty-state ha-icon {
        font-size: 34px;
      }


      .compact-header {
        display: grid;
        gap: 12px;
      }

      .compact-header-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .compact-header-main {
        display: grid;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }

      .menu-button,
      .compact-menu-item,
      .minimal-collapsed-button {
        border: 0;
        color: inherit;
        cursor: pointer;
      }

      .menu-button {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .compact-menu-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.18);
        z-index: 4;
        display: grid;
        align-items: start;
        justify-items: end;
        padding: 18px;
      }

      .compact-menu-panel {
        display: grid;
        gap: 8px;
        width: min(240px, 100%);
        padding: 8px;
        border-radius: 24px;
        background: color-mix(in srgb, var(--mysmart-music-card-background) 86%, white 14%);
        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.18);
      }

      .compact-menu-item {
        padding: 10px 16px;
        border-radius: 16px;
        background: var(--mysmart-music-card-button-surface);
        text-align: left;
      }

      .compact-menu-item.active {
        background: var(--mysmart-music-card-accent);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .compact-player-layout {
        display: grid;
        grid-template-columns: 102px minmax(0, 1fr);
        grid-template-areas:
          'art copy'
          'art transport';
        gap: 12px 16px;
        align-items: center;
      }

      .compact-artwork {
        grid-area: art;
        width: 102px;
        aspect-ratio: 1;
        border-radius: 20px;
        background: var(--mysmart-music-card-button-surface);
        background-size: cover;
        background-position: center;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .compact-copy {
        grid-area: copy;
        display: grid;
        align-content: end;
        gap: 6px;
        min-width: 0;
        align-self: end;
        padding-top: 6px;
      }

      .compact-title,
      .minimal-title {
        font-size: 1.15rem;
        font-weight: 600;
        line-height: 1.15;
      }

      .compact-subtitle,
      .minimal-subtitle {
        font-size: 0.92rem;
        color: var(--mysmart-music-card-muted);
        font-weight: 500;
      }

      .compact-transport {
        grid-area: transport;
        margin: 0;
        justify-content: flex-start;
        gap: 8px;
        flex-wrap: nowrap;
      }

      .compact-transport .icon-button {
        width: 40px;
        height: 40px;
      }

      .compact-transport .play-button {
        width: 56px;
        height: 56px;
      }

      .minimal-shell {
        position: relative;
        min-height: 100px;
      }

      .minimal-surface {
        min-height: 100px;
        border-radius: 28px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 14px;
        padding: 14px;
        cursor: pointer;
        transform-origin: right bottom;
        transition: opacity 220ms ease, transform 220ms ease;
      }

      .minimal-artwork {
        width: 72px;
        height: 72px;
        border-radius: 22px;
        background: var(--mysmart-music-card-tab-background);
        background-size: cover;
        background-position: center;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .minimal-copy {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .minimal-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .minimal-control {
        width: 40px;
        height: 40px;
      }

      .minimal-play {
        width: 54px;
        height: 54px;
      }

      .minimal-collapsed-button {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60px;
        height: 60px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 10px, 0) scale(0.7);
        transform-origin: right bottom;
        transition: opacity 220ms ease, transform 220ms ease;
      }

      .minimal-shell.is-collapsed {
        min-height: 60px;
      }

      .minimal-shell.is-collapsed .minimal-surface {
        opacity: 0;
        pointer-events: none;
        transform: translate3d(28px, 20px, 0) scale(0.7);
      }

      .minimal-shell.is-collapsed .minimal-collapsed-button {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) scale(1);
      }

      .compact-bars {
        width: 16px;
        height: 16px;
      }

      .content-minimal {
        padding: 0;
      }

      .shell-minimal {
        overflow: hidden;
      }

      ha-card.shell.shell-minimal.minimal-collapsed-shell {
        background: transparent;
        overflow: visible;
      }

      .shell-minimal .body-shell,
      .shell-minimal .panel {
        padding: 0;
      }

      .shell-compact .volume-master,
      .shell-compact .volume-item {
        grid-template-columns: minmax(88px, auto) minmax(0, 1fr) auto;
        gap: 12px;
        padding-block: 12px;
      }

      .shell-compact .volume-master .group-item-name,
      .shell-compact .volume-item .group-item-name {
        min-width: 0;
      }

      .shell-compact .volume-master .volume-slider-row,
      .shell-compact .volume-item .volume-slider-row {
        display: contents;
      }

      .shell-compact .volume-master .custom-volume-slider,
      .shell-compact .volume-item .custom-volume-slider {
        width: 100%;
      }

      .shell-compact .stream-pills {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-compact .stream-pills::-webkit-scrollbar {
        display: none;
      }

      .shell-compact .stream-pill {
        flex: 0 0 auto;
      }

      .shell-compact .body-shell-scroll {
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 0;
        padding-bottom: 0;
      }

      .filter-toggle {
        display: none;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 999px;
        color: inherit;
        background: var(--mysmart-music-card-button-surface);
        place-items: center;
        cursor: pointer;
      }

      .filter-toggle.active {
        color: var(--mysmart-music-card-play-button-icon-color);
        background: var(--mysmart-music-card-accent);
      }


      .shell-compact .grouping-panel,
      .shell-compact .favorite-panel {
        position: relative;
        height: 100%;
        min-height: 0;
        gap: 8px;
        grid-template-rows: minmax(0, 1fr) auto;
      }

      .shell-compact .group-list {
        min-height: 0;
        overflow: auto;
        gap: 6px;
        padding-right: 2px;
      }

      .shell-compact .group-item {
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 10px;
        min-height: 38px;
        padding: 5px 10px;
        border-radius: 14px;
      }

      .shell-compact .group-item-copy {
        display: flex;
        align-items: baseline;
        gap: 6px;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
      }

      .shell-compact .group-item-name,
      .shell-compact .group-item-meta {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .shell-compact .group-item-name {
        flex: 0 1 auto;
      }

      .shell-compact .group-item-meta {
        flex: 0 1 auto;
        font-size: 12px;
      }

      .shell-compact .group-status.live {
        padding: 2px 6px;
        font-size: 10px;
      }

      .shell-compact .group-actions {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        padding-top: 2px;
      }

      .shell-compact .group-actions button {
        min-width: 0;
        padding: 7px 6px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .shell-compact .favorite-list {
        grid-row: 1;
        min-height: 0;
        overflow: auto;
        gap: 6px;
        padding-right: 2px;
      }

      .shell-compact .favorite-toolbar {
        grid-row: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        overflow: hidden;
      }

      .shell-compact .filter-toggle {
        display: inline-flex;
        width: auto;
        flex: 0 0 auto;
        gap: 7px;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .shell-compact .favorite-toolbar .search-input {
        display: none;
      }

      .shell-compact .favorite-toolbar-row {
        display: flex;
        min-width: 0;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-compact .favorite-toolbar-row::-webkit-scrollbar {
        display: none;
      }

      .shell-compact .favorite-toolbar .filter-pills {
        display: none;
        flex-wrap: nowrap;
        gap: 6px;
      }

      .shell-compact .favorite-toolbar.filters-open .filter-pills {
        display: flex;
      }

      .shell-compact .favorite-toolbar .filter-pill {
        flex: 0 0 auto;
        padding: 6px 10px;
        font-size: 12px;
      }

      .shell-compact .favorite-item:not(.favorite-item-grid) {
        grid-template-columns: 38px minmax(0, 1fr) auto;
        gap: 9px;
        padding: 5px 8px;
        border-radius: 14px;
      }

      .shell-compact .favorite-art:not(.favorite-art-grid) {
        width: 38px;
        height: 38px;
        border-radius: 11px;
      }

      .shell-compact .favorite-list-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        align-content: start;
        gap: 8px;
      }

      .shell-compact .favorite-art-grid {
        border-radius: 12px;
      }

      .shell-compact .content {
        gap: 12px;
        padding: 12px;
      }

      .shell-compact .body-shell,
      .shell-compact .compact-player-layout {
        height: 100%;
        min-height: 0;
      }

      .shell-compact .compact-player-layout {
        grid-template-columns: minmax(120px, 38%) minmax(0, 1fr);
        grid-template-rows: auto auto;
        gap: 8px 12px;
        align-content: center;
        align-items: center;
        overflow: hidden;
      }

      .shell-compact .compact-artwork {
        width: 100%;
        height: auto;
        min-width: 0;
        min-height: 120px;
        max-width: 170px;
        justify-self: start;
        align-self: center;
        aspect-ratio: 1;
        border-radius: 20px;
      }

      .shell-compact .compact-copy {
        width: 100%;
        justify-items: start;
        justify-self: stretch;
        align-self: end;
        text-align: left;
        padding-top: 0;
      }

      .shell-compact .compact-transport {
        width: 100%;
        min-width: 0;
        justify-content: space-between;
        justify-self: stretch;
        align-self: start;
        gap: 2px;
        overflow: hidden;
      }

      .shell-compact .compact-transport .icon-button {
        width: 34px;
        min-width: 34px;
        height: 34px;
        flex: 0 0 34px;
      }

      .shell-compact .compact-transport .play-button {
        width: 48px;
        min-width: 48px;
        height: 48px;
        flex: 0 0 48px;
      }

      .shell-compact .top-shell {
        gap: 12px;
      }

      .custom-seek-slider.is-flat .custom-seek-wave-path {
        transition: d 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .stream-pill-bars span,
        .custom-seek-slider.is-animated .custom-seek-wave-svg,
        .favorite-item.is-starting .favorite-art,
        .favorite-loading-indicator ha-icon {
          animation: none;
        }
      }

      @media (max-width: 640px) {
        .content {
          padding: 18px;
        }

        .content-minimal {
          padding: 0;
        }

        .compact-player-layout {
          grid-template-columns: 82px minmax(0, 1fr);
          gap: 10px 12px;
        }

        .compact-artwork {
          width: 82px;
          border-radius: 18px;
        }

        .compact-transport {
          gap: 6px;
        }

        .compact-transport .icon-button {
          width: 36px;
          height: 36px;
        }

        .compact-transport .play-button {
          width: 50px;
          height: 50px;
        }

        .minimal-surface {
          grid-template-columns: auto minmax(0, 1fr);
          gap: 12px;
        }

        .minimal-controls {
          grid-column: 1 / -1;
          justify-content: flex-start;
          padding-left: 2px;
        }

        .track-title {
          font-size: 2em;
        }

        .transport-row {
          gap: 10px;
        }

        .icon-button {
          width: 42px;
          height: 42px;
        }

        .play-button {
          width: 60px;
          height: 60px;
        }
      }
`;
