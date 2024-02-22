import { FIELD_TYPES, TERMS_TYPE } from './constants.js';

export const formatTypeToLabel = (type) => {
  switch (type) {
    case FIELD_TYPES.TEXT: {
      return 'Имя';
    }
    case FIELD_TYPES.EMAIL: {
      return 'E-mail';
    }
    case FIELD_TYPES.TEL: {
      return 'Телефон';
    }
    case FIELD_TYPES.INPUT: {
      return 'Однострочный текст';
    }
    case FIELD_TYPES.TEXTAREA: {
      return 'Многострочный текст';
    }
    case TERMS_TYPE: {
      return 'Оферта сайта';
    }
    default: {
      return 'Unknown';
    }
  }
};
