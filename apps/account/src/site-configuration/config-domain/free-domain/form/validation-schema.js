import { toTypedSchema } from '@vee-validate/zod';
import { FREE_DOMAIN } from 'account/src/utility/constants/domain';
import { objectSchema, requiredFieldMessage } from 'account/src/utility/validation-rules';
import { custom } from 'zod';
import { FREE_DOMAIN_KEY } from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [FREE_DOMAIN_KEY]: custom(
      (value) => {
        const result = (value || '').replace(FREE_DOMAIN, '');

        return result.length > 0;
      },
      { message: requiredFieldMessage }
    ),
  })
);
