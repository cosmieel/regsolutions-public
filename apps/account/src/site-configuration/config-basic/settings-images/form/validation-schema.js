import { toTypedSchema } from '@vee-validate/zod';
import { objectSchema, stringSchema } from 'account/src/utility/validation-rules';
import { FAVICON_KEY, LOGO_KEY, THUMBNAIL_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [LOGO_KEY]: stringSchema(),
    [FAVICON_KEY]: stringSchema(),
    [THUMBNAIL_KEY]: stringSchema(),
  })
);
