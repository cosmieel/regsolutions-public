/**
 * @param {object} parameters - Object of query params
 */
export const constructQueryParameters = (parameters) => {
  const result = new URLSearchParams();

  for (const [key, value] of Object.entries(parameters)) {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        for (const v of value) {
          result.append(key, v);
        }
      } else {
        result.set(key, value);
      }
    }
  }

  return result.toString() ? `?${result.toString()}` : '';
};
