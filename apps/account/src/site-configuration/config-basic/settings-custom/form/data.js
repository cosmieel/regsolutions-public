import { HEAD_KEY, BODY_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [HEAD_KEY]: '',
  [BODY_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [HEAD_KEY]: data?.[HEAD_KEY] || DEFAULT_VALUES[HEAD_KEY],
    [BODY_KEY]: data?.[BODY_KEY] || DEFAULT_VALUES[BODY_KEY],
  };
};
