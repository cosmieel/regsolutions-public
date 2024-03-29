import { FetchHttpClient } from 'account/src/data/network/fetch-http-client-impl.js';
import { constructQueryParameters } from 'account/src/data/network/utility/construct-query-parameters.js';
import config from './config.js';

const httpClient = new FetchHttpClient();

export const api = {
  getAllCatalogs: async (siteId, parameters = {}) => {
    let requestUrl = `${config.catalogApiUrl}/${siteId}`;

    if (parameters?.queryParameters) {
      requestUrl = requestUrl + constructQueryParameters(parameters.queryParameters);
    }

    const response = await fetch(requestUrl, { credentials: 'include' });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    if (!result) {
      return [];
    }

    return result;
  },

  getAllCatalogItems: async (data, parameters = {}) => {
    let requestUrl = `${config.catalogApiUrl}/item/${data.siteId}/${data.catalogId}`;

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

    if (!result) {
      return [];
    }

    return result;
  },

  getCatalogById: async (data) => {
    const response = await fetch(`${config.catalogApiUrl}/${data.siteId}/${data.catalogId}`, {
      credentials: 'include',
    });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  getCatalogItemById: async (data) => {
    const response = await fetch(`${config.catalogApiUrl}/item/${data.catalogItemId}`, {
      credentials: 'include',
    });
    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  create: async (data) => {
    const response = await fetch(`${config.catalogApiUrl}`, {
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

  createItem: async (catalogItemData) => {
    let response;

    // eslint-disable-next-line no-useless-catch
    try {
      response = await fetch(`${config.catalogApiUrl}/item`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalogItemData),
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
    const response = await fetch(`${config.catalogApiUrl}`, {
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

  batchUpdate: async (data) => {
    return await httpClient.put(`${config.catalogApiUrl}/batch`, data);
  },

  updateItem: async (catalogItemData) => {
    let response;

    // eslint-disable-next-line no-useless-catch
    try {
      response = await fetch(`${config.catalogApiUrl}/item`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalogItemData),
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

  batchUpdateItems: async (data) => {
    return httpClient.put(`${config.catalogApiUrl}/items/batch`, data);
  },

  delete: async (catalogId) => {
    const response = await fetch(`${config.catalogApiUrl}/${catalogId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  deleteItem: async (catalogItemId) => {
    const response = await fetch(`${config.catalogApiUrl}/item/${catalogItemId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  duplicateItem: async (catalogItemId) => {
    const response = await fetch(`${config.catalogApiUrl}/item/${catalogItemId}/duplicate`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catalogItemId),
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  importCsvCatalog: async (data) => {
    const formData = new FormData();

    formData.append('file', data.file);

    const response = await fetch(`${config.catalogApiUrl}/${data.siteId}/import-csv`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const result = await response.json();

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  importBnovoCatalog: async (data) => {
    const response = await fetch(
      `${config.catalogApiUrl}/${data.siteId}/import-bnovo/${data.bnovoCatalogId}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (response.status === 500) {
      throw new Error('Произошла неизвестная ошибка');
    }

    const result = await response.json();

    if (result?.error === 'error_bnovo_not_found') {
      throw new Error('Каталог с таким id не найден');
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },
};
