import config from './config.js';
import { fetchRequest } from './fetch-request.js';

const headers = {
  'Content-Type': 'application/json',
};

export const api = {
  getOptions: async () => {
    const result = await fetchRequest({
      url: `${config.optionsApiUrl}`,
      options: {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    });

    return result;
  },
};
