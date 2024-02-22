import { FREE_DOMAIN_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [FREE_DOMAIN_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [FREE_DOMAIN_KEY]: data?.[FREE_DOMAIN_KEY] || DEFAULT_VALUES[FREE_DOMAIN_KEY],
  };
};
