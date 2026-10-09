export const FAVORITE_FILTER_ALL = 'all';
export const FAVORITE_FILTER_ALBUM = 'album';
export const FAVORITE_FILTER_PLAYLIST = 'playlist';
export const FAVORITE_FILTER_RADIO = 'radio';

export const DISPLAY_MODE_FULL = 'full';
export const DISPLAY_MODE_COMPACT = 'compact';
export const DISPLAY_MODE_MINIMAL = 'minimal';
export const DISPLAY_MODE_TABLET = 'tablet';

export function favoriteLookupKeyFor(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function buildFavoriteLookupKeys(mediaId, title) {
  const mediaIdKey = favoriteLookupKeyFor(mediaId);
  const titleKey = favoriteLookupKeyFor(title);
  const comboKey = favoriteLookupKeyFor(`${mediaId || ''}|${title || ''}`);

  return {
    mediaIdKey,
    titleKey,
    comboKey,
  };
}

export function buildFavoriteLookupMap(records, { idField, titleField }) {
  const lookup = {};
  const titleCounts = new Map();

  for (const record of records || []) {
    const { titleKey } = buildFavoriteLookupKeys(record?.[idField], record?.[titleField]);
    if (titleKey) {
      titleCounts.set(titleKey, (titleCounts.get(titleKey) || 0) + 1);
    }
  }

  for (const record of records || []) {
    const { mediaIdKey, titleKey, comboKey } = buildFavoriteLookupKeys(record?.[idField], record?.[titleField]);

    if (mediaIdKey && !lookup[mediaIdKey]) {
      lookup[mediaIdKey] = record;
    }

    if (comboKey && !lookup[comboKey]) {
      lookup[comboKey] = record;
    }

    if (titleKey && titleCounts.get(titleKey) === 1 && !lookup[titleKey]) {
      lookup[titleKey] = record;
    }
  }

  return lookup;
}

export function findFavoriteLookupMatch(lookup, mediaId, title) {
  const { mediaIdKey, titleKey, comboKey } = buildFavoriteLookupKeys(mediaId, title);
  const keys = [mediaIdKey, comboKey, titleKey];

  for (const key of keys) {
    if (key && lookup?.[key]) {
      return lookup[key];
    }
  }

  return {};
}

export function buildFavoritesCacheKey(items) {
  return JSON.stringify(
    Object.entries(items || {}).map(([mediaId, value]) => {
      const item = typeof value === 'object' && value !== null ? value : {};
      return [
        mediaId,
        typeof value === 'string' ? value : item.title || item.name || '',
        item.type || item.media_content_type || item.media_class || '',
        item.image || item.thumbnail || item.entity_picture || item.media_image_url || '',
      ];
    }),
  );
}

export function findFavoritesEntityId(states) {
  const stateObjects = Object.values(states || {});
  const favoriteSensor = stateObjects.find((stateObj) => stateObj.entity_id.startsWith('sensor.') && stateObj.attributes?.items);
  return favoriteSensor?.entity_id || '';
}

export function getPreferredBrowseEntityId(configuredEntities, states) {
  const entities = Array.isArray(configuredEntities) ? configuredEntities.filter(Boolean) : [];
  if (!entities.length) {
    return '';
  }

  return entities.find((entityId) => states?.[entityId]) || entities[0];
}

export function favoriteTypeLabel(type) {
  if (type === FAVORITE_FILTER_ALBUM) {
    return 'Album';
  }

  if (type === FAVORITE_FILTER_PLAYLIST) {
    return 'Playlist';
  }

  if (type === FAVORITE_FILTER_RADIO) {
    return 'Radio';
  }

  return 'Sonos favorite';
}

export function prettifyFavoriteType(value) {
  return String(value)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeFavoriteType(value, mediaId = '', name = '', metadata = {}) {
  const text = `${value || ''} ${mediaId || ''} ${name || ''} ${metadata.mediaContentId || ''} ${metadata.mediaContentType || ''} ${metadata.childrenMediaClass || ''} ${metadata.favoriteType || ''}`.toLowerCase();

  if (
    text.includes('radio')
    || text.includes('station')
    || text.includes('mp3radio')
    || text.includes('audio broadcast')
    || text.includes('stream')
  ) {
    return FAVORITE_FILTER_RADIO;
  }

  if (
    text.includes('playlist')
    || text.includes('playlistcontainer')
    || text.includes('0006206c')
    || text.includes('0006204c')
    || text.includes('spotify:playlist')
    || text.includes('tidal:playlist')
    || text.includes('applemusic:playlist')
    || text.includes('deezer:playlist')
    || text.includes('ytmusic:playlist')
  ) {
    return FAVORITE_FILTER_PLAYLIST;
  }

  if (
    text.includes('album')
    || text.includes('musicalbum')
    || text.includes('0004002c')
    || text.includes('spotify:album')
    || text.includes('tidal:album')
    || text.includes('applemusic:album')
    || text.includes('deezer:album')
    || text.includes('qobuz:album')
  ) {
    return FAVORITE_FILTER_ALBUM;
  }

  if (metadata.canExpand === false && metadata.childrenMediaClass === 'track') {
    return FAVORITE_FILTER_ALBUM;
  }

  if (metadata.canExpand === true && metadata.childrenMediaClass === 'track') {
    return FAVORITE_FILTER_PLAYLIST;
  }

  return FAVORITE_FILTER_ALL;
}

export function computeProportionalGroupVolumes(levels, targetPercent) {
  const normalizedLevels = (levels || []).map((level) => ({
    entityId: level.entityId,
    currentValue: Math.max(0, Math.min(100, Number(level.currentValue) || 0)),
  }));
  const clampedTarget = Math.max(0, Math.min(100, Number(targetPercent) || 0));

  if (!normalizedLevels.length) {
    return [];
  }

  if (clampedTarget === 0) {
    return normalizedLevels.map((level) => ({
      entityId: level.entityId,
      volumePercent: 0,
    }));
  }

  const average = normalizedLevels.reduce((sum, level) => sum + level.currentValue, 0) / normalizedLevels.length;

  if (average <= 0) {
    return normalizedLevels.map((level) => ({
      entityId: level.entityId,
      volumePercent: clampedTarget,
    }));
  }

  const scale = clampedTarget / average;
  return normalizedLevels.map((level) => ({
    entityId: level.entityId,
    volumePercent: Math.max(0, Math.min(100, Math.round(level.currentValue * scale))),
  }));
}

export function normalizeCssSize(value) {
  if (value == null || value === '') {
    return '';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value}px`;
  }

  const text = String(value).trim();
  if (!text) {
    return '';
  }

  if (/^\d+(\.\d+)?$/.test(text)) {
    return `${text}px`;
  }

  return text;
}

export function shouldRunProgressClock({
  isConnected,
  playerVisible,
  seekbarVisible,
  mediaState,
  mediaDuration,
}) {
  return Boolean(
    isConnected
    && playerVisible
    && seekbarVisible
    && mediaState === 'playing'
    && (Number(mediaDuration) || 0) > 0
  );
}

export function getDisplayMode(config) {
  const mode = String(config?.display_mode || DISPLAY_MODE_FULL).toLowerCase();
  if ([DISPLAY_MODE_FULL, DISPLAY_MODE_COMPACT, DISPLAY_MODE_MINIMAL, DISPLAY_MODE_TABLET].includes(mode)) {
    return mode;
  }

  return DISPLAY_MODE_FULL;
}
