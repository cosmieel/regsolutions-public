import { PAID_DOMAIN_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [PAID_DOMAIN_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [PAID_DOMAIN_KEY]: data?.[PAID_DOMAIN_KEY] || DEFAULT_VALUES[PAID_DOMAIN_KEY],
  };
};
