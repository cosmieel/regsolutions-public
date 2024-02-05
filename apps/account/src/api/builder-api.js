import config from './config.js';
import { fetchRequest } from './fetch-request.js';

const headers = {
  'Content-Type': 'application/json',
};

export const api = {
  getBlocks: async (pageId) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${pageId}`,
      options: {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    });

    return result;
  },

  createBlock: async (data) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${data.pageId}`,
      options: {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(data.blockProps),
      },
    });

    return result;
  },

  sortBlocks: async (data) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${data.pageId}/sort`,
      options: {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ blocks: data.blocks }),
      },
    });

    return result;
  },

  duplicateBlock: async (data) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${data.pageId}/${data.blockId}/duplicate`,
      options: {
        method: 'POST',
        credentials: 'include',
        headers,
        // body: JSON.stringify(blockId),
      },
    });

    return result;
  },

  updateBlock: async (data) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${data.pageId}/${data.blockId}`,
      options: {
        method: 'PUT',
        credentials: 'include',
        headers,
        body: JSON.stringify(data.blockProps),
      },
    });

    return result;
  },

  deleteBlock: async (data) => {
    const result = await fetchRequest({
      url: `${config.builderApiUrl}/${data.pageId}/${data.blockId}`,
      options: {
        method: 'DELETE',
        credentials: 'include',
      },
    });

    return result;
  },

  updateMenu: async (menuData) => {
    const result = await fetchRequest({
      url: `${config.menuApiUrl}`,
      options: {
        method: 'PUT',
        credentials: 'include',
        headers,
        body: JSON.stringify(menuData),
      },
    });

    return result;
  },
};
