import { generateUniqueKey } from 'account/src/utility/generate-unique-key';
import { ref, provide } from 'vue';
import { EVENT_TYPES } from '../components/options/constants.js';
import { FIELD_TYPES, FIELDS_STATE_KEY } from '../constants.js';
import { DEFAULT_FIELDS_STATE, FIELDS_LIST } from '../data.js';

const ONLY_ONE_FIELD_LIST = new Set([FIELD_TYPES.EMAIL, FIELD_TYPES.TEL, FIELD_TYPES.TEXT]);

const getDefaultFieldByType = (type) => {
  return FIELDS_LIST.find((item) => item.type === type);
};

export const userFields = (initFields) => {
  const fields = ref(initFields?.length > 0 ? initFields : DEFAULT_FIELDS_STATE);

  const isRestrictedFieldsExists = (type) =>
    ONLY_ONE_FIELD_LIST.has(type) && fields.value.some((item) => item.type === type);

  const handleAddField = (type) => {
    if (isRestrictedFieldsExists(type)) {
      return;
    }

    const field = getDefaultFieldByType(type);

    if (field) {
      fields.value.push({ name: `field${generateUniqueKey()}`, ...field });
    }
  };

  const handleRemoveField = (name) => {
    const foundIndex = fields.value.findIndex((value) => value.name === name);

    if (foundIndex !== -1) {
      fields.value = fields.value.filter((value) => value.name !== name);
    }
  };

  const handleToggleRequired = (name) => {
    const foundIndex = fields.value.findIndex((value) => value.name === name);

    if (foundIndex !== -1) {
      fields.value[foundIndex].required = !fields.value[foundIndex].required;
    }
  };

  const handleChangeLabel = (name, data) => {
    const foundIndex = fields.value.findIndex((value) => value.name === name);

    if (foundIndex !== -1) {
      fields.value[foundIndex].label = data.name;
    }
  };

  const handleOptionsAction = (name, data) => {
    switch (data.type) {
      case EVENT_TYPES.REQUIRED: {
        handleToggleRequired(name);

        break;
      }
      case EVENT_TYPES.RENAME: {
        handleChangeLabel(name, data.value);

        break;
      }
      case EVENT_TYPES.REMOVE: {
        handleRemoveField(name);

        break;
      }
      default: {
        break;
      }
    }
  };

  provide(FIELDS_STATE_KEY, {
    fields,
    handleOptionsAction,
  });

  return { fields, handleAddField, handleRemoveField, isRestrictedFieldsExists };
};
