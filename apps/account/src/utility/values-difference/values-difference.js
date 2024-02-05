import isEqual from 'lodash/isEqual';
import { unref } from 'vue';

/**
 * @param {import('vue').Ref<object[]> || object[]} currentValues - Dynamic values
 * @param {import('vue').Ref<object[]> || object[]} initialValues - Static values
 */
export const valuesDifference = (currentValues, initialValues) => {
  const currentValuesUnref = unref(currentValues);
  const initialValuesUnref = unref(initialValues);

  const result = {};
  const entries = Object.entries(currentValuesUnref);

  entries.map(([key, value]) => {
    if (
      (typeof value !== 'object' && initialValuesUnref[key] !== value && key !== 'id') ||
      (value === null && initialValuesUnref[key] !== value)
    ) {
      result[key] = value;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      for (const property in value) {
        if (!isEqual(initialValuesUnref[key]?.[property], value[property])) {
          result[key] = {
            [property]: value[property],
            ...value,
          };
        }
      }
    }

    if (Array.isArray(value) && !isEqual(initialValuesUnref[key], value)) {
      result[key] = value;
    }
  });

  return result;
};
