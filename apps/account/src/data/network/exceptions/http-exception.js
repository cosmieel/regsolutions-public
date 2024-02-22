import { HTTP_ERROR_NETWORK_MESSAGE } from '../constants/http-error-messages.js';

export class HttpException extends Error {
  statusCode = null;
  body = null;
  code = null;

  /**
   * @param {string} message
   * @param {string} body
   * @param {number=} statusCode
   * @param {string=} code
   */
  constructor(message = HTTP_ERROR_NETWORK_MESSAGE, body, statusCode, code) {
    super(message);

    this.statusCode = statusCode;
    this.body = body;
    this.code = code;
  }
}
