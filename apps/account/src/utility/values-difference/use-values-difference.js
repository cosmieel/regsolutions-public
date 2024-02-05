import { computed } from 'vue';
import { valuesDifference } from './values-difference.js';

/**
 * @param {import('vue').Ref<object[]> || object[]} currentValues - Dynamic values
 * @param {import('vue').Ref<object[]> || object[]} initialValues - Static values
 */
export const useValuesDifference = (currentValues, initialValues) => {
  return computed(() => valuesDifference(currentValues, initialValues));
};
