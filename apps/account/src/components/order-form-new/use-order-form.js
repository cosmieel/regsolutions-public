import { computed, watch } from 'vue';
import { useButton } from './composibles/use-button.js';
import { useTerms } from './composibles/use-terms.js';
import { userFields } from './composibles/user-fields.js';
import { TERMS_TYPE } from './constants.js';
import { FIELDS_LIST } from './data.js';

const isFields = (type) => {
  return FIELDS_LIST.some((item) => item.type === type);
};

export const useOrderForm = (props, changeCallback) => {
  const fieldsData = userFields([...props.fields]);
  const buttonData = useButton({ ...props.button });
  const termsData = useTerms({ ...props.terms });

  const handleAddItem = (type) => {
    if (isFields(type)) {
      fieldsData.handleAddField(type);

      return;
    }

    if (type === TERMS_TYPE) {
      termsData.handleAdd();

      return;
    }
  };

  const resultData = computed(() => ({
    terms: termsData.terms.value,
    button: buttonData.button.value,
    fields: fieldsData.fields.value,
  }));

  watch(
    () => resultData.value,
    (value) => {
      changeCallback(value);
    },
    { deep: true }
  );

  const isDisabledAddItemOption = (type) => {
    if (isFields(type)) {
      return fieldsData.isRestrictedFieldsExists(type);
    }

    if (type === TERMS_TYPE) {
      return !!termsData.terms.value;
    }
  };

  return {
    handleAddItem,
    isDisabledAddItemOption,
    terms: termsData.terms,
    button: buttonData.button,
    fields: fieldsData.fields,
  };
};
