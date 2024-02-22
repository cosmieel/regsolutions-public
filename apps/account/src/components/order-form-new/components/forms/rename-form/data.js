import { NAME_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [NAME_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [NAME_KEY]: data[NAME_KEY] || DEFAULT_VALUES[NAME_KEY],
  };
};
