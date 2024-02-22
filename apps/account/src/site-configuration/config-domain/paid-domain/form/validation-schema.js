import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { PAID_DOMAIN_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [PAID_DOMAIN_KEY]: stringSchema(),
  })
);
