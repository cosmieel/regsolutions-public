import { LANGUAGE } from '../constants/language.js';

/**
 * @param {LANGUAGE | string} key - RU & EN
 */
export const formatLanguageKeyToText = (key) => {
  switch (key) {
    case LANGUAGE.RU: {
      return 'Русский';
    }
    case LANGUAGE.EN: {
      return 'Английский';
    }
    default: {
      return 'Unknown';
    }
  }
};
