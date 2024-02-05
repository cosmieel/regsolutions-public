export function getHint(name, validator) {
  if (!validator[name] || !validator[name].$error) {
    return;
  }

  if (validator[name].required?.$invalid) {
    return 'Поле обязательно';
  }

  if (validator[name].email?.$invalid) {
    return 'E-mail неверный. Проверьте его написание';
  }

  if (validator[name].phone?.$invalid) {
    return 'Телефон неверный. Проверьте написание номера';
  }
}
