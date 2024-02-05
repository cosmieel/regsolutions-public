import { required, email } from '@vuelidate/validators';
import { phone } from '../../services/validators/phone.js';

export function getRules(fields) {
  const rules = {};

  for (const field of fields) {
    if (field.required) {
      rules[field.name] = rules[field.name]
        ? { ...rules[field.name], required }
        : { required };
    }

    if (field.type === 'email') {
      rules[field.name] = rules[field.name]
        ? { ...rules[field.name], email }
        : { email };
    }

    if (field.type === 'phone') {
      rules[field.name] = rules[field.name]
        ? { ...rules[field.name], phone }
        : { phone };
    }
  }

  return rules;
}
