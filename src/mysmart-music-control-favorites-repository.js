import { buildFavoriteLookupMap } from './mysmart-music-control-helpers.js';

const MAX_BROWSE_DEPTH = 12;

export async function browseMedia(hass, entityId, mediaContentType, mediaContentId) {
  const message = { type: 'media_player/browse_media', entity_id: entityId };
  if (mediaContentType != null) message.media_content_type = mediaContentType;
  if (mediaContentId != null) message.media_content_id = mediaContentId;
  if (typeof hass?.callWS === 'function') return hass.callWS(message);
  if (hass?.connection?.sendMessagePromise) return hass.connection.sendMessagePromise(message);
  return null;
}

export async function loadFavoriteData(hass, entityId, resolveMediaUrl = (value) => value || '') {
  const root = await browseMedia(hass, entityId);
  const favoritesNode = root?.children?.find((child) => {
    const title = String(child?.title || '').toLowerCase();
    const type = String(child?.media_content_type || '').toLowerCase();
    const id = String(child?.media_content_id || '').toLowerCase();
    return title === 'favorites' || type === 'favorites' || id === 'favorites';
  });

  if (!favoritesNode) {
    return { browseItems: {}, metadata: {} };
  }

  const records = [];
  await collectFavoriteRecords(
    hass,
    entityId,
    favoritesNode,
    records,
    favoritesNode.title || 'Favorites',
    resolveMediaUrl,
    new Set(),
    0,
  );

  return {
    browseItems: buildFavoriteLookupMap(records, { idField: 'media_content_id', titleField: 'title' }),
    metadata: buildFavoriteLookupMap(records, { idField: 'mediaContentId', titleField: 'title' }),
  };
}

async function collectFavoriteRecords(
  hass,
  entityId,
  node,
  records,
  parentTitle,
  resolveMediaUrl,
  visited,
  depth,
) {
  if (!node || depth > MAX_BROWSE_DEPTH) {
    return;
  }

  const nodeKey = [
    node.media_content_type || '',
    node.media_content_id || '',
    node.title || '',
  ].join('|');

  if (visited.has(nodeKey)) {
    return;
  }
  visited.add(nodeKey);

  const dir = node.can_expand === false && Array.isArray(node.children)
    ? node
    : await browseMedia(hass, entityId, node.media_content_type, node.media_content_id || '');
  const favoriteType = dir?.title || parentTitle || '';

  for (const child of dir?.children || []) {
    if (child.can_play) {
      const mediaContentId = child.media_content_id || '';
      const mediaContentType = child.media_content_type || '';
      records.push({
        title: child.title || '',
        media_content_id: mediaContentId,
        media_content_type: mediaContentType,
        mediaContentId,
        mediaContentType,
        image: resolveMediaUrl(
          child.thumbnail
          || child.media_image_url
          || child.entity_picture
          || child.image
          || child.image_url
          || '',
        ),
        rawType: mediaContentType || child.media_class || '',
        canExpand: child.can_expand,
        childrenMediaClass: child.children_media_class || '',
        favoriteType,
      });
    }

    if (child.can_expand) {
      await collectFavoriteRecords(
        hass,
        entityId,
        child,
        records,
        child.title || favoriteType,
        resolveMediaUrl,
        visited,
        depth + 1,
      );
    }
  }
}
