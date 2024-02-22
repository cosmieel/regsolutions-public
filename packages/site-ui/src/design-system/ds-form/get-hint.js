import { localizer } from 'site-ui/src/localizer/localizer.js';

export function getHint(name, validator) {
  if (!validator[name] || !validator[name].$error) {
    return;
  }

  if (validator[name].required?.$invalid) {
    return localizer.t('form.required');
  }

  if (validator[name].email?.$invalid) {
    return localizer.t('form.email');
  }

  if (validator[name].phone?.$invalid) {
    return localizer.t('form.phone');
  }
}
