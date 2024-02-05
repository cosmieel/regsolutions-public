import config from './config.js';

export const api = {
  sendCode: async (email) => {
    const response = await fetch(`${config.authApiUrl}/send-code`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    const result = await response.json();

    if (result?.code === 'ValidationError') {
      throw new Error('Такой почты не существует');
    }

    if (result?.error === 'error_json_schema') {
      throw new Error('Такой почты не существует');
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  auth: async (authData) => {
    const response = await fetch(`${config.authApiUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    const result = await response.json();

    if (result?.error === 'error_wrong_code') {
      throw new Error('Введен неверный код подтверждения');
    }

    if (result?.error === 'error_json_schema') {
      throw new Error('Введены неверные почта и/или код подтверждения');
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },

  logout: async () => {
    const response = await fetch(`${config.authApiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    return response;
  },
};
