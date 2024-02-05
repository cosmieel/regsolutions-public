import config from './config.js';
import { fetchRequest } from './fetch-request.js';

const headers = {
  'Content-Type': 'application/json',
};

export const api = {
  getUser: async () => {
    const result = await fetchRequest({
      url: `${config.userApiUrl}`,
      options: {
        method: 'GET',
        headers,
      },
    });

    return result;
  },

  updateUser: async (newData) => {
    const result = await fetchRequest({
      url: `${config.userApiUrl}`,
      options: {
        method: 'PATCH',
        headers,
        body: JSON.stringify(newData),
      },
    });

    return result;
  },

  sendEmailUpdateCode: async (email) => {
    const result = await fetchRequest({
      url: `${config.userApiUrl}/send-code`,
      options: {
        method: 'POST',
        headers,
        body: JSON.stringify({ email }),
      },
    });

    return result;
  },
};
