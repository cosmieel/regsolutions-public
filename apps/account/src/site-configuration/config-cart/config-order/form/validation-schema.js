import { toTypedSchema } from '@vee-validate/zod';
import { formOrderValidationObject } from 'account/src/components/form/form-order/validation-object.js';
import { objectSchema } from 'account/src/utility/validation-rules';

export const validationSchema = toTypedSchema(objectSchema(formOrderValidationObject));
