export function getFormData(fields) {
  const formData = {};

  for (const field of fields) {
    formData[field.name] = '';
  }

  return formData;
}
