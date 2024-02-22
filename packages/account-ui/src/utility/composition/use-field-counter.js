/* eslint-disable unicorn/explicit-length-check */
import { ref, watch } from 'vue';

export const useFieldCounter = (props) => {
  const currentCount = ref(props.modelValue.length || '');

  const setCurrentCount = (value) => {
    currentCount.value = value.length || '';
  };

  watch(
    () => props.modelValue,
    (value) => {
      setCurrentCount(value);
    }
  );

  return {
    currentCount,
  };
};
