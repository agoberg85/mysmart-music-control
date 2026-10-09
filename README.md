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
