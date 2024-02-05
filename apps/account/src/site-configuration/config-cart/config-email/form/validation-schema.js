import { toTypedSchema } from '@vee-validate/zod';
import {
  objectSchema,
  stringSchema,
  getMaxLengthErrorMessage,
  invalidEmailAddress,
} from 'account/src/utility/validation-rules';
import { literal } from 'zod';
import { MAX_LENGTH_EMAIL, EMAIL_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [EMAIL_KEY]: stringSchema()
      .max(MAX_LENGTH_EMAIL, getMaxLengthErrorMessage(MAX_LENGTH_EMAIL))
      .email(invalidEmailAddress)
      .optional()
      .or(literal('')),
  })
);
