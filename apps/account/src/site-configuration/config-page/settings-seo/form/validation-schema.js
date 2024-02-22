import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, tagsSchema } from 'account/src/utility/validation-rules';
import { KEYWORDS_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [KEYWORDS_KEY]: tagsSchema,
  })
);
