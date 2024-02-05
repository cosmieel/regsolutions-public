import { toTypedSchema } from '@vee-validate/zod';
import {
  objectSchema,
  requiredString,
  stringSchema,
  getMaxLengthErrorMessage,
} from 'account/src/utility/validation-rules';
import {
  NAME_KEY,
  DESCRIPTION_KEY,
  LANGUAGE_KEY,
  MAX_LENGTH_NAME,
  MAX_LENGTH_DESCRIPTION,
} from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [NAME_KEY]: requiredString().max(MAX_LENGTH_NAME, getMaxLengthErrorMessage(MAX_LENGTH_NAME)),
    [LANGUAGE_KEY]: requiredString(),
    [DESCRIPTION_KEY]: stringSchema().max(
      MAX_LENGTH_DESCRIPTION,
      getMaxLengthErrorMessage(MAX_LENGTH_DESCRIPTION)
    ),
  })
);
