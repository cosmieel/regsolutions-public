import {
  HTTP_422_ERROR_VALIDATION_MESSAGE,
  HTTP_500_ERROR_MESSAGE,
  HTTP_404_ERROR_NOT_FOUND_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '../constants/http-error-messages.js';

/**
 * @param {number} code
 */
export const getMessageByErrorCode = (code) => {
  switch (code) {
    case 422: {
      return HTTP_422_ERROR_VALIDATION_MESSAGE;
    }
    case 404: {
      return HTTP_404_ERROR_NOT_FOUND_MESSAGE;
    }
    case 500: {
      return HTTP_500_ERROR_MESSAGE;
    }
    default: {
      return COMMON_ERROR_MESSAGE;
    }
  }
};
