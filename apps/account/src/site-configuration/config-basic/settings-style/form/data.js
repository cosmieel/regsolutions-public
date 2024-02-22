import { COLOR_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [COLOR_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [COLOR_KEY]: data?.[COLOR_KEY] || DEFAULT_VALUES[COLOR_KEY],
  };
};
