import { ref, provide } from 'vue';
import {
  POLICY_URL_KEY,
  RULES_URL_KEY,
} from '../components/forms/terms-settings-form/constants.js';
import { EVENT_TYPES } from '../components/options/constants.js';
import { TERMS_STATE_KEY } from '../constants.js';
import { DEFAULT_TERMS_STATE, EMPTY_TERMS_STATE } from '../data.js';

export const useTerms = (initTerms) => {
  const terms = ref(Object.values(initTerms).length > 0 ? initTerms : DEFAULT_TERMS_STATE);

  const handleAdd = () => {
    if (terms.value === DEFAULT_TERMS_STATE) {
      terms.value = EMPTY_TERMS_STATE;
    }
  };

  const handleRemove = () => {
    terms.value = DEFAULT_TERMS_STATE;
  };

  const handleChange = (data) => {
    terms.value = {
      policyLink: data[POLICY_URL_KEY],
      rulesLink: data[RULES_URL_KEY],
    };
  };

  const handleOptionsAction = (data) => {
    switch (data.type) {
      case EVENT_TYPES.TERMS_SETTINGS: {
        handleChange(data.value);

        break;
      }
      case EVENT_TYPES.REMOVE: {
        handleRemove();

        break;
      }
      default: {
        break;
      }
    }
  };

  provide(TERMS_STATE_KEY, {
    terms,
    handleAdd,
    handleOptionsAction,
  });

  return { terms, handleAdd };
};
