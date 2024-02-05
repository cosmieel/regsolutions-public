import { EMAIL_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [EMAIL_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [EMAIL_KEY]: data?.[EMAIL_KEY] || DEFAULT_VALUES[EMAIL_KEY],
  };
};
