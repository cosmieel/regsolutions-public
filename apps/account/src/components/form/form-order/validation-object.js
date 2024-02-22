import { booleanSchema, objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { BUTTON_KEY, FIELDS_KEY, TERMS_KEY } from './constants.js';

export const formOrderValidationObject = {
  [FIELDS_KEY]: objectSchema({
    name: stringSchema(),
    type: stringSchema(),
    label: stringSchema(),
    required: booleanSchema(),
  }).array(),
  [BUTTON_KEY]: objectSchema({
    text: stringSchema(),
  }),
  [TERMS_KEY]: objectSchema({
    rulesLink: stringSchema(),
    policyLink: stringSchema(),
  }).nullable(),
};
