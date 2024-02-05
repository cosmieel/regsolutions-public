import { toTypedSchema } from '@vee-validate/zod';
import {
  objectSchema,
  requiredString,
  stringSchema,
  getMaxLengthErrorMessage,
} from 'account/src/utility/validation-rules';
import {
  TITLE_KEY,
  DESCRIPTION_KEY,
  SLUG_KEY,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_TITLE,
  MAX_LENGTH_SLUG,
} from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [TITLE_KEY]: stringSchema().max(MAX_LENGTH_TITLE, getMaxLengthErrorMessage(MAX_LENGTH_TITLE)),
    [SLUG_KEY]: requiredString().max(MAX_LENGTH_SLUG, getMaxLengthErrorMessage(MAX_LENGTH_SLUG)),
    [DESCRIPTION_KEY]: stringSchema().max(
      MAX_LENGTH_DESCRIPTION,
      getMaxLengthErrorMessage(MAX_LENGTH_DESCRIPTION)
    ),
  })
);
