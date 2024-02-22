import { toTypedSchema } from '@vee-validate/zod';
import {
  arrayOfStrings,
  booleanSchema,
  objectSchema,
  positiveNumberSchema,
  requiredString,
  stringSchema,
  tagSchema,
  tagsSchema,
} from 'account/src/utility/validation-rules';
import {
  ACTIVE_KEY,
  BADGE_KEY,
  CATALOG_ID_KEY,
  CATEGORY_KEY,
  COUNT_KEY,
  DESCRIPTION,
  IMAGES_KEY,
  NAME_KEY,
  PRICE_KEY,
  PRICE_OLD_KEY,
  ORDER_INDEX_KEY,
  // PRICE_UNIT_KEY,
  SHORT_DESCRIPTION,
  SKU_KEY,
  SLUG_KEY,
  TAGS_KEY,
} from './constants.js';

export const validationSchema = toTypedSchema(
  objectSchema({
    [ACTIVE_KEY]: booleanSchema(),
    [SKU_KEY]: stringSchema(),
    [SLUG_KEY]: stringSchema(),
    [NAME_KEY]: requiredString(),
    [PRICE_KEY]: positiveNumberSchema(),
    [PRICE_OLD_KEY]: positiveNumberSchema(),
    [ORDER_INDEX_KEY]: positiveNumberSchema(),
    // [PRICE_UNIT_KEY]: stringSchema(),
    [TAGS_KEY]: tagsSchema,
    [CATEGORY_KEY]: stringSchema(),
    [COUNT_KEY]: positiveNumberSchema(),
    [IMAGES_KEY]: arrayOfStrings,
    [BADGE_KEY]: tagSchema,
    [DESCRIPTION]: stringSchema(),
    [SHORT_DESCRIPTION]: stringSchema(),
    [CATALOG_ID_KEY]: requiredString(),
  })
);
