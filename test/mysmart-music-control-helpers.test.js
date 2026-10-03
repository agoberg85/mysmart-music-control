import test from 'node:test';
import assert from 'node:assert/strict';

import {
  FAVORITE_FILTER_ALBUM,
  FAVORITE_FILTER_PLAYLIST,
  FAVORITE_FILTER_RADIO,
  buildFavoriteLookupMap,
  computeProportionalGroupVolumes,
  findFavoriteLookupMatch,
  findFavoritesEntityId,
  getPreferredBrowseEntityId,
  normalizeFavoriteType,
} from '../src/mysmart-music-control-helpers.js';

test('findFavoritesEntityId returns the first sensor with items', () => {
  const entityId = findFavoritesEntityId({
    'sensor.weather': { entity_id: 'sensor.weather', attributes: {} },
    'sensor.sonos_favorites': {
      entity_id: 'sensor.sonos_favorites',
      attributes: { items: { one: 'Favorite 1' } },
    },
  });

  assert.equal(entityId, 'sensor.sonos_favorites');
});

test('getPreferredBrowseEntityId prefers the first available configured speaker', () => {
  const entityId = getPreferredBrowseEntityId(
    ['media_player.missing', 'media_player.kitchen', 'media_player.office'],
    {
      'media_player.kitchen': { entity_id: 'media_player.kitchen' },
      'media_player.office': { entity_id: 'media_player.office' },
    },
  );

  assert.equal(entityId, 'media_player.kitchen');
});

test('getPreferredBrowseEntityId falls back to the first configured speaker when none are available', () => {
  const entityId = getPreferredBrowseEntityId(
    ['media_player.missing', 'media_player.other_missing'],
    {},
  );

  assert.equal(entityId, 'media_player.missing');
});

test('favorite lookup prefers exact media ids over ambiguous titles', () => {
  const lookup = buildFavoriteLookupMap([
    { media_content_id: 'album-1', title: 'Shared Name', favoriteType: 'Album' },
    { media_content_id: 'album-2', title: 'Shared Name', favoriteType: 'Playlist' },
  ], { idField: 'media_content_id', titleField: 'title' });

  assert.equal(findFavoriteLookupMatch(lookup, 'album-2', 'Shared Name').media_content_id, 'album-2');
});

test('normalizeFavoriteType classifies nested track containers as albums or playlists', () => {
  assert.equal(
    normalizeFavoriteType('', 'id-1', 'Album Name', { canExpand: false, childrenMediaClass: 'track' }),
    FAVORITE_FILTER_ALBUM,
  );
  assert.equal(
    normalizeFavoriteType('', 'id-2', 'Playlist Name', { canExpand: true, childrenMediaClass: 'track' }),
    FAVORITE_FILTER_PLAYLIST,
  );
  assert.equal(
    normalizeFavoriteType('Radio Station', 'id-3', 'Station Name', {}),
    FAVORITE_FILTER_RADIO,
  );
});

test('computeProportionalGroupVolumes preserves relative balance for uneven speakers', () => {
  const result = computeProportionalGroupVolumes([
    { entityId: 'media_player.one', currentValue: 20 },
    { entityId: 'media_player.two', currentValue: 40 },
  ], 45);

  assert.deepEqual(result, [
    { entityId: 'media_player.one', volumePercent: 30 },
    { entityId: 'media_player.two', volumePercent: 60 },
  ]);
});

test('computeProportionalGroupVolumes clamps loud groups at the top end', () => {
  const result = computeProportionalGroupVolumes([
    { entityId: 'media_player.one', currentValue: 30 },
    { entityId: 'media_player.two', currentValue: 60 },
    { entityId: 'media_player.three', currentValue: 90 },
  ], 90);

  assert.deepEqual(result, [
    { entityId: 'media_player.one', volumePercent: 45 },
    { entityId: 'media_player.two', volumePercent: 90 },
    { entityId: 'media_player.three', volumePercent: 100 },
  ]);
});

test('computeProportionalGroupVolumes handles fully muted groups by applying the target evenly', () => {
  const result = computeProportionalGroupVolumes([
    { entityId: 'media_player.one', currentValue: 0 },
    { entityId: 'media_player.two', currentValue: 0 },
  ], 35);

  assert.deepEqual(result, [
    { entityId: 'media_player.one', volumePercent: 35 },
    { entityId: 'media_player.two', volumePercent: 35 },
  ]);
});
