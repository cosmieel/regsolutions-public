import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { RULES_URL_KEY, POLICY_URL_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [RULES_URL_KEY]: stringSchema(),
    [POLICY_URL_KEY]: stringSchema(),
  })
);
