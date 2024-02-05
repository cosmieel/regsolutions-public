import { constructQueryParameters } from 'account/src/data/network/utility/construct-query-parameters.js';
import config from './config.js';

export const api = {
  getAll: async () => {
    const response = await fetch(`${config.siteApiUrl}`, { credentials: 'include' });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    if (!result) {
      return [];
    }

    return result;
  },

  /**
   * @param {string} siteId - Site id value
   * @param {RequestInit} parameters - Parameters of fetch request
   */
  getSiteById: async (siteId, parameters = {}) => {
    let requestUrl = `${config.siteApiUrl}/${siteId}`;

    if (parameters?.queryParameters) {
      requestUrl = requestUrl + constructQueryParameters(parameters.queryParameters);
    }

    const response = await fetch(requestUrl, {
      credentials: 'include',
    });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  create: async (data) => {
    let response;

    // eslint-disable-next-line no-useless-catch
    try {
      response = await fetch(`${config.siteApiUrl}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw error;
    }

    if (response.ok) {
      return await response.json();
    }

    const json = await response.json();

    throw new Error(json.error);
  },

  update: async (data) => {
    const response = await fetch(`${config.siteApiUrl}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result?.code) {
      throw new Error(result.code);
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  delete: async (siteId) => {
    const response = await fetch(`${config.siteApiUrl}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siteId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  duplicate: async (siteId) => {
    const response = await fetch(`${config.siteApiUrl}/duplicate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siteId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  publish: async (siteId) => {
    const response = await fetch(`${config.siteApiUrl}/${siteId}/publish`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siteId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  validateDomain: async (domain) => {
    const response = await fetch(`${config.siteApiUrl}/validate-domain`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(domain),
    });

    const result = await response.json();

    if (result?.code) {
      throw new Error(result?.code);
    }

    if (result?.error === 'error_json_schema') {
      throw new Error('Неверный формат домена');
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  lookupDomain: async (domain) => {
    const response = await fetch(`${config.siteApiUrl}/lookup-domain`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(domain),
    });

    const result = await response.json();

    if (result?.code) {
      throw new Error(result?.code);
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  upload: async (data) => {
    const formData = new FormData();

    formData.append('file', data.file);

    const response = await fetch(`${config.siteApiUrl}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      signal: data.signal,
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },
};
