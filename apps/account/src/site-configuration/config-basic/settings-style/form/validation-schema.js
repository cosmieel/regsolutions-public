import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { COLOR_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [COLOR_KEY]: stringSchema(),
  })
);
