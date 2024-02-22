import { ref, provide } from 'vue';
import { EVENT_TYPES } from '../components/options/constants.js';
import { BUTTON_STATE_KEY } from '../constants.js';
import { DEFAULT_BUTTON_STATE } from '../data.js';

export const useButton = (initButton) => {
  const button = ref(initButton || DEFAULT_BUTTON_STATE);

  const handleChangeText = (data) => {
    if (data.name !== button.value.text) {
      button.value.text = data.name;
    }
  };

  const handleOptionsAction = (data) => {
    switch (data.type) {
      case EVENT_TYPES.RENAME: {
        handleChangeText(data.value);

        break;
      }
      default: {
        break;
      }
    }
  };

  provide(BUTTON_STATE_KEY, {
    button,
    handleOptionsAction,
  });

  return { button };
};
