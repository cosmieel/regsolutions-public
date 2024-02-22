import isNaN from 'lodash/isNaN';
import { object, string, number, array, boolean, custom, preprocess, literal } from 'zod';

export const requiredFieldMessage = 'Обязательное поле';

export const invalidEmailAddress = 'Невалидный email';

export const restrictedSymbols = 'Недопустимые символы';

/**
 * @param {number} value - Max value
 */
export const getMaxLengthErrorMessage = (value) => `Максимум ${value} символов`;

/**
 * @namespace SchemaRules
 * @property {string | undefined} description
 * @property {string | undefined} required_error
 * @property {string | undefined} invalid_type_error
 * @param {SchemaRules} data
 */
const createCustomMessages = (data) => ({
  description: data?.description,
  invalid_type_error: data?.invalid_type_error || restrictedSymbols,
  required_error: data?.required_error || requiredFieldMessage,
});

/**
 * @param {object} fields - Validate fields
 */
export const objectSchema = (fields) => object(fields);

/**
 * @param {SchemaRules} options - Schema options
 */
export const stringSchema = (options) => string(createCustomMessages(options)).trim();

/**
 * @param {SchemaRules} options - Schema options
 */
export const numberSchema = (options) => number(createCustomMessages(options));

/**
 * @param {SchemaRules} options - Schema options
 */
export const booleanSchema = (options) => boolean(createCustomMessages(options));

/**
 * @param {object | undefined} fields - Schema options
 * @param {SchemaRules} options - Schema options
 */
export const arraySchema = (fields, options) => array(fields, createCustomMessages(options));

export const arrayOfStrings = stringSchema().array();

/**
 * @param {string | undefined} message - Error message. By default = requiredFieldMessage
 */
export const requiredString = (message = requiredFieldMessage) => stringSchema().min(1, message);

export const isNumericString = custom((value) => {
  if (value) {
    return !isNaN(Number(value));
  }

  return true;
}, restrictedSymbols);

export const positiveNumberSchema = () =>
  preprocess((value) => {
    const processed = stringSchema()
      .regex(/^\d+$/)
      .optional()
      .or(literal(''))
      .transform(Number)
      .safeParse(value);

    return processed.success ? processed.data : value;
  }, numberSchema().transform(String));

export const tagSchema = custom(() => true, restrictedSymbols);

export const tagsSchema = array(tagSchema);
