import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DISPLAY_MODE_COMPACT,
  DISPLAY_MODE_FULL,
  DISPLAY_MODE_MINIMAL,
  buildFavoriteLookupMap,
  buildFavoritesCacheKey,
  findFavoriteLookupMatch,
  getDisplayMode,
  normalizeCssSize,
  shouldRunProgressClock,
} from '../src/mysmart-music-control-helpers.js';
import {
  resolveCardLocale,
  translateCardString,
} from '../src/mysmart-music-control-i18n.js';

test('buildFavoriteLookupMap does not create ambiguous plain-title matches', () => {
  const lookup = buildFavoriteLookupMap([
    { media_content_id: 'album-1', title: 'Shared Name' },
    { media_content_id: 'album-2', title: 'Shared Name' },
  ], { idField: 'media_content_id', titleField: 'title' });

  assert.deepEqual(findFavoriteLookupMatch(lookup, '', 'Shared Name'), {});
  assert.equal(findFavoriteLookupMatch(lookup, 'album-1', 'Shared Name').media_content_id, 'album-1');
});

test('buildFavoritesCacheKey changes when favorite metadata changes', () => {
  const first = buildFavoritesCacheKey({
    one: { title: 'Song A', type: 'album', image: '/a.jpg' },
  });
  const second = buildFavoritesCacheKey({
    one: { title: 'Song A', type: 'album', image: '/b.jpg' },
  });

  assert.notEqual(first, second);
});

test('getDisplayMode normalizes supported modes and falls back to full', () => {
  assert.equal(getDisplayMode({ display_mode: DISPLAY_MODE_COMPACT }), DISPLAY_MODE_COMPACT);
  assert.equal(getDisplayMode({ display_mode: DISPLAY_MODE_MINIMAL }), DISPLAY_MODE_MINIMAL);
  assert.equal(getDisplayMode({ display_mode: 'something-else' }), DISPLAY_MODE_FULL);
});

test('normalizeCssSize adds px to plain numbers and preserves css units', () => {
  assert.equal(normalizeCssSize('400'), '400px');
  assert.equal(normalizeCssSize(320), '320px');
  assert.equal(normalizeCssSize('50vh'), '50vh');
  assert.equal(normalizeCssSize(''), '');
});

test('resolveCardLocale prefers Norwegian variants and falls back to English', () => {
  assert.equal(resolveCardLocale({ locale: { language: 'nb-NO' } }), 'nb');
  assert.equal(resolveCardLocale({ locale: { language: 'no' } }), 'nb');
  assert.equal(resolveCardLocale({ locale: { language: 'en-US' } }), 'en');
});

test('translateCardString returns localized strings with English fallback and interpolation', () => {
  assert.equal(
    translateCardString({ locale: { language: 'nb-NO' } }, 'player'),
    'Spiller',
  );
  assert.equal(
    translateCardString({ locale: { language: 'fr-FR' } }, 'player'),
    'Player',
  );
  assert.equal(
    translateCardString({ locale: { language: 'nb-NO' } }, 'active_speakers_other', { count: 3 }),
    '3 aktive høyttalere',
  );
  assert.equal(
    translateCardString({ locale: { language: 'nb-NO' } }, 'favorite_playback_failed', { name: 'Radio' }),
    'Kunne ikke starte Radio. Prøv igjen.',
  );
});


test('shouldRunProgressClock only enables updates for a visible playing seekbar', () => {
  const base = {
    isConnected: true,
    playerVisible: true,
    seekbarVisible: true,
    mediaState: 'playing',
    mediaDuration: 240,
  };

  assert.equal(shouldRunProgressClock(base), true);
  assert.equal(shouldRunProgressClock({ ...base, playerVisible: false }), false);
  assert.equal(shouldRunProgressClock({ ...base, seekbarVisible: false }), false);
  assert.equal(shouldRunProgressClock({ ...base, mediaState: 'paused' }), false);
  assert.equal(shouldRunProgressClock({ ...base, mediaDuration: 0 }), false);
  assert.equal(shouldRunProgressClock({ ...base, isConnected: false }), false);
});
