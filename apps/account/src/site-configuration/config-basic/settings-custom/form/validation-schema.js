import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { HEAD_KEY, BODY_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [HEAD_KEY]: stringSchema(),
    [BODY_KEY]: stringSchema(),
  })
);
