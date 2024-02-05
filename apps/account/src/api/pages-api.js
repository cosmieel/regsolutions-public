import config from './config.js';

export const api = {
  getPageById: async (pageId) => {
    const response = await fetch(`${config.pageApiUrl}/${pageId}`, { credentials: 'include' });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  getAllPages: async (siteId) => {
    const response = await fetch(`${config.pageApiUrl}/${siteId}/`, { credentials: 'include' });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    if (!result) {
      return [];
    }

    return result;
  },

  create: async (data) => {
    const response = await fetch(`${config.pageApiUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  update: async (data) => {
    const response = await fetch(`${config.pageApiUrl}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  delete: async (pageId) => {
    const response = await fetch(`${config.pageApiUrl}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  duplicate: async (pageId) => {
    const response = await fetch(`${config.pageApiUrl}/duplicate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },
};
