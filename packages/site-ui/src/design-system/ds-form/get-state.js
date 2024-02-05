export function getState(name, validator) {
  if (!validator[name]) {
    return;
  }

  return validator[name].$error ? 'error' : 'default';
}
