import test from 'node:test';
import assert from 'node:assert/strict';

import {
  browseMedia,
  loadFavoriteData,
} from '../src/mysmart-music-control-favorites-repository.js';

test('browseMedia sends the Home Assistant websocket message', async () => {
  const messages = [];
  const hass = {
    callWS: async (message) => {
      messages.push(message);
      return { children: [] };
    },
  };

  await browseMedia(hass, 'media_player.living_room', 'favorites', 'item-1');

  assert.deepEqual(messages, [{
    type: 'media_player/browse_media',
    entity_id: 'media_player.living_room',
    media_content_type: 'favorites',
    media_content_id: 'item-1',
  }]);
});

test('loadFavoriteData creates browse and metadata lookups from one traversal', async () => {
  let requestCount = 0;
  const hass = {
    callWS: async () => {
      requestCount += 1;
      return {
        children: [{
          title: 'Favorites',
          media_content_type: 'favorites',
          media_content_id: 'favorites',
          can_expand: false,
          children: [{
            title: 'Chill Hits',
            media_content_id: 'favorite-1',
            media_content_type: 'playlist',
            thumbnail: '/api/image.jpg',
            can_play: true,
            can_expand: false,
            children_media_class: 'track',
          }],
        }],
      };
    },
  };

  const data = await loadFavoriteData(hass, 'media_player.living_room', (url) => `resolved:${url}`);

  assert.equal(requestCount, 1);
  assert.equal(data.browseItems['favorite 1'].title, 'Chill Hits');
  assert.equal(data.browseItems['favorite 1'].image, 'resolved:/api/image.jpg');
  assert.equal(data.metadata['favorite 1'].mediaContentType, 'playlist');
  assert.equal(data.metadata['favorite 1'].childrenMediaClass, 'track');
});

test('loadFavoriteData traverses nested folders once and ignores cycles', async () => {
  const messages = [];
  const hass = {
    callWS: async (message) => {
      messages.push(message);
      if (!message.media_content_id) {
        return {
          children: [{
            title: 'Favorites',
            media_content_type: 'favorites',
            media_content_id: 'favorites',
            can_expand: true,
          }],
        };
      }
      if (message.media_content_id === 'favorites') {
        return {
          title: 'Favorites',
          children: [{
            title: 'Albums',
            media_content_type: 'folder',
            media_content_id: 'albums',
            can_expand: true,
          }],
        };
      }
      return {
        title: 'Albums',
        children: [{
          title: 'Morning Album',
          media_content_id: 'album-1',
          media_content_type: 'album',
          can_play: true,
        }, {
          title: 'Albums',
          media_content_type: 'folder',
          media_content_id: 'albums',
          can_expand: true,
        }],
      };
    },
  };

  const data = await loadFavoriteData(hass, 'media_player.living_room');

  assert.equal(messages.length, 3);
  assert.equal(data.browseItems['album 1'].title, 'Morning Album');
  assert.equal(data.metadata['album 1'].favoriteType, 'Albums');
});

test('loadFavoriteData returns empty lookups when Favorites is unavailable', async () => {
  const hass = { callWS: async () => ({ children: [] }) };
  assert.deepEqual(
    await loadFavoriteData(hass, 'media_player.living_room'),
    { browseItems: {}, metadata: {} },
  );
});
