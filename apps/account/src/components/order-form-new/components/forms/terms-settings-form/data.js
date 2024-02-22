import { RULES_URL_KEY, POLICY_URL_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [RULES_URL_KEY]: '',
  [POLICY_URL_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [RULES_URL_KEY]: data[RULES_URL_KEY] || DEFAULT_VALUES[RULES_URL_KEY],
    [POLICY_URL_KEY]: data[POLICY_URL_KEY] || DEFAULT_VALUES[POLICY_URL_KEY],
  };
};
