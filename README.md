# MySmart Music Control

A Sonos-focused Home Assistant dashboard card with a cleaner player UI, stream pills, grouping controls, per-speaker volumes, and a favorites browser.

## Features

- Multiple Sonos entities in one card
- Stream pills that automatically reflect your active Sonos groups
- Group and ungroup workflow built around checkboxes plus an apply button
- Dedicated Volumes tab with one overall slider and one slider per grouped speaker
- Favorites browser powered by a Sonos favorites sensor
- Favorite search and filter pills for albums, playlists, and radio
- Album favorites automatically turn shuffle off before playback starts
- Artwork-first player layout with transport, seek, shuffle, repeat, and volume controls

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Click the three dots in the upper right corner and choose **Custom repositories**.
3. Paste `https://github.com/agoberg85/mysmart-music-control` into the repository field, select **Dashboard** as the type, and click **Add**.
4. Search for **MySmart Music Control** in HACS, open it, and click **Download**.
5. Reload your browser when HACS asks you to.

On Home Assistant 2026.11 and later, HACS is replaced by the built-in Marketplace. Go to **Settings > Marketplace**, choose **Add from link**, and paste the same URL. This requires a connected GitHub account.

### Manual

1. Download `mysmart-music-control.js` from the [latest release](https://github.com/agoberg85/mysmart-music-control/releases/latest) and copy it to `config/www/`.
2. Go to **Settings > Dashboards**, open the three dots menu, and choose **Resources**.
3. Add `/local/mysmart-music-control.js` as a **JavaScript module**.
4. Reload your browser.

### Favorites sensor

The Browse tab needs the Sonos favorites sensor, which you may have to enable first. Go to **Settings > Devices & services > Entities**, search for **Sonos favorites**, open its settings, and turn on **Enabled**.

## Configuration

```yaml
type: custom:mysmart-music-control
entities:
  - media_player.living_room
  - media_player.kitchen
  - media_player.office
favorites_entity: sensor.sonos_favorites
title: Home Audio
```

### Tablet (landscape) layout

Set `display_mode: tablet` for a wide layout aimed at wall-mounted landscape tablets: the artwork stays pinned on the left while stream tabs and the Player / Grouping / Volumes / Browse switcher share a single header row. The player puts title and transport side by side with the seekbar and volume on one bottom row, grouping and volumes use multi-column grids, and Browse shows favorites as a horizontally scrolling row of tiles.

```yaml
type: custom:mysmart-music-control
display_mode: tablet
entities:
  - media_player.stue
  - media_player.kjokken
  - media_player.lekerom
```

Setting `height` scales the artwork to fill the card height.

## Notes

- `entities` should contain the Sonos speakers you want the card to manage.
- `favorites_entity` should point at a sensor whose `items` attribute contains Sonos favorites. In Home Assistant this is commonly `sensor.sonos_favorites`.
- The card derives streams from current Sonos grouping state, so if you split or join speakers elsewhere, the pills update automatically.
- Favorite artwork depends on the image fields exposed by your favorites sensor. If your sensor does not include cover URLs, the card falls back to type-based icons for now.
