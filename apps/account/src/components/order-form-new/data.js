import { FIELD_TYPES, TERMS_TYPE } from './constants.js';
import { formatTypeToLabel } from './formatters.js';

export const DEFAULT_BUTTON_STATE = {
  text: 'Оформить заказ',
};

export const DEFAULT_FIELDS_STATE = [];

export const DEFAULT_TERMS_STATE = null;

export const EMPTY_TERMS_STATE = {
  policyLink: '',
  rulesLink: '',
};

export const FIELDS_LIST = [
  {
    type: FIELD_TYPES.TEXT,
    label: formatTypeToLabel(FIELD_TYPES.TEXT),
    required: false,
  },
  {
    type: FIELD_TYPES.EMAIL,
    label: formatTypeToLabel(FIELD_TYPES.EMAIL),
    required: true,
  },
  {
    type: FIELD_TYPES.TEL,
    label: formatTypeToLabel(FIELD_TYPES.TEL),
    required: false,
  },
  {
    type: FIELD_TYPES.INPUT,
    label: formatTypeToLabel(FIELD_TYPES.INPUT),
    required: false,
  },
  {
    type: FIELD_TYPES.TEXTAREA,
    label: formatTypeToLabel(FIELD_TYPES.TEXTAREA),
    required: false,
  },
];

export const POSSIBLE_MENU_LIST = [
  FIELD_TYPES.EMAIL,
  FIELD_TYPES.TEL,
  FIELD_TYPES.TEXT,
  FIELD_TYPES.INPUT,
  FIELD_TYPES.TEXTAREA,
  TERMS_TYPE,
].map((type) => ({
  type,
  disabled: false,
  label: formatTypeToLabel(type),
}));
