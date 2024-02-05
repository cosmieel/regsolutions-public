import { TITLE_KEY, SLUG_KEY, DESCRIPTION_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [TITLE_KEY]: '',
  [SLUG_KEY]: '',
  [DESCRIPTION_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [TITLE_KEY]: data?.[TITLE_KEY] || DEFAULT_VALUES[TITLE_KEY],
    [SLUG_KEY]: data?.[SLUG_KEY] || DEFAULT_VALUES[SLUG_KEY],
    [DESCRIPTION_KEY]: data?.[DESCRIPTION_KEY] || DEFAULT_VALUES[DESCRIPTION_KEY],
  };
};
