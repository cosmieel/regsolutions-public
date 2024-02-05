import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
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
  // PRICE_UNIT_KEY,
  SHORT_DESCRIPTION,
  SKU_KEY,
  SLUG_KEY,
  TAGS_KEY,
} from './constants.js';

const DEFAULT_VALUES = {
  [ACTIVE_KEY]: false,
  [SKU_KEY]: '',
  [SLUG_KEY]: '',
  [NAME_KEY]: '',
  [PRICE_KEY]: '',
  [PRICE_OLD_KEY]: '',
  // [PRICE_UNIT_KEY]: '',
  [TAGS_KEY]: [],
  [CATEGORY_KEY]: '',
  [COUNT_KEY]: '',
  [IMAGES_KEY]: [],
  [BADGE_KEY]: null,
  [DESCRIPTION]: '',
  [SHORT_DESCRIPTION]: '',
  [CATALOG_ID_KEY]: '',
};

export const getInitialValues = (catalogId, data) => {
  return {
    [ACTIVE_KEY]: data?.[ACTIVE_KEY] || DEFAULT_VALUES[ACTIVE_KEY],
    [SKU_KEY]: data?.[SKU_KEY] || DEFAULT_VALUES[SKU_KEY],
    [SLUG_KEY]: data?.[SLUG_KEY] || DEFAULT_VALUES[SLUG_KEY],
    [NAME_KEY]: data?.[NAME_KEY] || DEFAULT_VALUES[NAME_KEY],
    [PRICE_KEY]: data?.[PRICE_KEY] ? String(data[PRICE_KEY]) : DEFAULT_VALUES[PRICE_KEY],
    [PRICE_OLD_KEY]: data?.[PRICE_OLD_KEY]
      ? String(data[PRICE_OLD_KEY])
      : DEFAULT_VALUES[PRICE_OLD_KEY],
    // [PRICE_UNIT_KEY]: data?.[PRICE_UNIT_KEY] || DEFAULT_VALUES[PRICE_UNIT_KEY],
    [TAGS_KEY]: data?.[TAGS_KEY] || DEFAULT_VALUES[TAGS_KEY],
    [CATEGORY_KEY]: data?.[CATEGORY_KEY] || DEFAULT_VALUES[CATEGORY_KEY],
    [COUNT_KEY]: data?.[COUNT_KEY] || DEFAULT_VALUES[COUNT_KEY],
    [IMAGES_KEY]: data?.[IMAGES_KEY] || DEFAULT_VALUES[IMAGES_KEY],
    [BADGE_KEY]: isEmpty(data?.[BADGE_KEY]) ? DEFAULT_VALUES[BADGE_KEY] : data?.[BADGE_KEY],
    [DESCRIPTION]: data?.[DESCRIPTION] || DEFAULT_VALUES[DESCRIPTION],
    [SHORT_DESCRIPTION]: data?.[SHORT_DESCRIPTION] || DEFAULT_VALUES[SHORT_DESCRIPTION],
    [CATALOG_ID_KEY]: catalogId ? String(catalogId) : DEFAULT_VALUES[CATALOG_ID_KEY],
  };
};

export const convertDataForRequest = (data) => {
  return {
    [ACTIVE_KEY]: data[ACTIVE_KEY],
    [SKU_KEY]: data[SKU_KEY] ?? undefined,
    [SLUG_KEY]: data[SLUG_KEY] ?? undefined,
    [NAME_KEY]: data[NAME_KEY],
    [PRICE_KEY]: isNil(data[PRICE_KEY]) ? undefined : Number(data[PRICE_KEY]),
    [PRICE_OLD_KEY]: isNil(data[PRICE_OLD_KEY]) ? undefined : Number(data[PRICE_OLD_KEY]),
    // [PRICE_UNIT_KEY]: data[PRICE_UNIT_KEY] ?? undefined,
    [TAGS_KEY]: data[TAGS_KEY],
    [CATEGORY_KEY]: data[CATEGORY_KEY] ?? undefined,
    [COUNT_KEY]: isNil(data[COUNT_KEY]) ? undefined : Number(data[COUNT_KEY]),
    [IMAGES_KEY]: data[IMAGES_KEY],
    [BADGE_KEY]: data[BADGE_KEY] === null ? {} : data[BADGE_KEY],
    [DESCRIPTION]: data[DESCRIPTION],
    [SHORT_DESCRIPTION]: data[SHORT_DESCRIPTION] ?? undefined,
    [CATALOG_ID_KEY]: isNil(data[CATALOG_ID_KEY]) ? undefined : Number(data[CATALOG_ID_KEY]),
  };
};
