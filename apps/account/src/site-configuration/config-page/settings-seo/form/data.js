import { KEYWORDS_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [KEYWORDS_KEY]: [],
};

/**
 * @param {string} value
 * @return {{text: *}[]}
 */
const formatKeywordsForForm = (value) => {
  if (!value) {
    return [];
  }

  return (value?.split(',') || []).map((item) => ({ text: item, icon: '' }));
};

export const getInitialValues = (data) => {
  const keywords = formatKeywordsForForm(data?.[KEYWORDS_KEY]);

  return {
    [KEYWORDS_KEY]: keywords.length > 0 ? keywords : DEFAULT_VALUES[KEYWORDS_KEY],
  };
};

/**
 * @param {{text: string}[]} value
 * @return string
 */
const formatKeywordsForRequest = (value) => {
  return (value || []).map((item) => item.text).join(',');
};

/**
 * @param {{[key: string]: *}} data
 * @return {{[key: string]: *}}
 */
export const convertDataForRequest = (data) => {
  return {
    [KEYWORDS_KEY]: formatKeywordsForRequest(data[KEYWORDS_KEY]),
  };
};
