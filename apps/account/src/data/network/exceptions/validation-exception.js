import { VALIDATION_ERROR_MESSAGE } from 'account/src/data/network/constants/http-error-messages';

export class ValidationException extends Error {
  constructor(message = VALIDATION_ERROR_MESSAGE) {
    super(message);
  }
}
