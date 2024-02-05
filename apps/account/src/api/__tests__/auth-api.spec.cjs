/* eslint-disable no-undef */
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { api } from '../auth-api.js';
import config from '../config.js';

global.fetch = vi.fn();

function createFetchResponse(data, ok) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok,
  };
}

beforeEach(() => {
  global.fetch.mockReset();
});

describe('Метод sendCode', () => {
  const testEmail = 'test@test.com';

  test('должен посылать POST запрос с электронной почтой', async () => {
    const response = {
      email: testEmail,
      codeExist: false,
    };

    fetch.mockResolvedValue(createFetchResponse(response));

    const sendCodeRequest = await api.sendCode(testEmail);

    expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/send-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmail),
    });

    expect(sendCodeRequest).toStrictEqual(response);
  });

  test('должен выьросить ошибку, если в ответе пришла ошибка', async () => {
    const response = {
      error: 'example Error',
    };

    fetch.mockResolvedValue(createFetchResponse(response));

    await expect(
      async () => await api.sendCode(testEmail)
    ).rejects.toThrowError();
  });
});

describe('Метод auth', () => {
  const testEmail = 'test@test.com';
  const testCode = 'cRhnE0k7kK';
  const authData = {
    email: testEmail,
    code: testCode,
  };

  test('должен посылать POST запрос с электронной почтой и кодом для аутентификации пользователя', async () => {
    const response = {
      id: 1234,
      email: testEmail,
    };

    fetch.mockResolvedValue(createFetchResponse(response));

    const authRequest = await api.auth(authData);

    expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    expect(authRequest).toStrictEqual(response);
  });

  test('должен выьросить ошибку, если в ответе пришла ошибка', async () => {
    const response = {
      error: 'example Error',
    };

    fetch.mockResolvedValue(createFetchResponse(response));

    await expect(async () => await api.auth(authData)).rejects.toThrowError();
  });
});

describe('Метод logout', () => {
  test('должен посылать POST запрос для разлогина пользователя', async () => {
    const response = {};

    fetch.mockResolvedValue(createFetchResponse(response, true));

    const logoutRequest = await api.logout();

    expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/logout`, {
      method: 'POST',
    });

    expect(logoutRequest.ok).toBe(true);
  });
});
