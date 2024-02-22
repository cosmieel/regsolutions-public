import {
  FIELDS_KEY,
  BUTTON_KEY,
  TERMS_KEY,
} from 'account/src/components/form/form-order/constants.js';

const DEFAULT_VALUES = {
  [FIELDS_KEY]: [],
  [BUTTON_KEY]: { text: '' },
  [TERMS_KEY]: null,
};

export const getInitialValues = (data) => {
  return {
    [FIELDS_KEY]: data?.[FIELDS_KEY] || DEFAULT_VALUES[FIELDS_KEY],
    [BUTTON_KEY]: data?.[BUTTON_KEY] || DEFAULT_VALUES[BUTTON_KEY],
    [TERMS_KEY]: data?.[TERMS_KEY] || DEFAULT_VALUES[TERMS_KEY],
  };
};
