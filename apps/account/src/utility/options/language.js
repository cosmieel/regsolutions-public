import { LANGUAGE } from '../constants/language.js';
import { formatLanguageKeyToText } from '../formatters/language.js';

export const getLanguageOptions = () =>
  Object.values(LANGUAGE).map((value) => ({
    name: formatLanguageKeyToText(value),
    value,
  }));

export const languageOptions = getLanguageOptions();
