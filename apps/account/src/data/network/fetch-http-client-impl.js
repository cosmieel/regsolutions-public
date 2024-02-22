import { HTTP_ERROR_NETWORK_MESSAGE } from './constants/http-error-messages.js';
import { HttpException } from './exceptions/http-exception.js';
import { getMessageByErrorCode } from './formatters/get-message-by-error-code.js';
import { constructQueryParameters } from './utility/construct-query-parameters.js';

export class FetchHttpClient {
  _errors = new WeakMap();

  /**
   * @param {string} url
   * @param {object=} parameters
   * @param {object=} headers
   * @return Promise<any>
   */
  async get(url, parameters, headers) {
    const request = {
      method: 'GET',
      ...(parameters ? { queryParams: parameters } : {}),
      ...(headers ? { headers } : {}),
    };

    const response = await this.#fetch(url, request);

    return await response.json();
  }

  /**
   * @param {string} url
   * @param {object | null} payload
   * @param {object=} headers
   * @return Promise<any>
   */
  async post(url, payload = null, headers) {
    const request = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : null,
    };

    const response = await this.#fetch(url, request);

    return await response.json();
  }

  /**
   * @param {string} url
   * @param {object | null} payload
   * @param {object=} headers
   * @return Promise<any>
   */
  async put(url, payload, headers) {
    const request = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : null,
    };

    const response = await this.#fetch(url, request);

    return response.status === 204 ? response : await response.json();
  }

  /**
   * @param {string} url
   * @param {object} options
   * @return Promise<any>
   */
  async #fetch(url, options) {
    let response;
    let requestUrl = url;

    if (options.queryParams) {
      requestUrl = requestUrl + constructQueryParameters(options.queryParams);
    }

    try {
      response = await fetch(requestUrl, { credentials: 'include', ...options });
    } catch (error) {
      throw new HttpException(HTTP_ERROR_NETWORK_MESSAGE, String(error));
    }

    if (response.ok) {
      return response;
    }

    const json = await response.json();

    throw new HttpException(
      getMessageByErrorCode(response.status),
      json,
      response.status,
      json.code
    );
  }
}
