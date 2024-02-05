import { LANGUAGE } from 'account/src/utility/constants/language';
import { NAME_KEY, LANGUAGE_KEY, DESCRIPTION_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [NAME_KEY]: '',
  [LANGUAGE_KEY]: LANGUAGE.RU,
  [DESCRIPTION_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [NAME_KEY]: data?.[NAME_KEY] || DEFAULT_VALUES[NAME_KEY],
    [LANGUAGE_KEY]: data?.[LANGUAGE_KEY] || DEFAULT_VALUES[LANGUAGE_KEY],
    [DESCRIPTION_KEY]: data?.[DESCRIPTION_KEY] || DEFAULT_VALUES[DESCRIPTION_KEY],
  };
};
