import { reactive } from 'vue';
import { en } from './locales/en.js';
import { ru } from './locales/ru.js';

class Localizer {
  constructor() {
    this.locales = { ru, en };
    this.language = 'ru';
    this.interpolationKey = new RegExp('{{(.*?)}}', 'g');
  }

  get currentLocale() {
    return this.locales[this.language];
  }

  setLanguage(locale) {
    if (!Object.keys(this.locales).includes(locale)) {
      console.warn('Locale not supported');

      return;
    }

    this.language = locale;

    document.querySelector('html').setAttribute('lang', locale);
  }

  t(path, placeholder) {
    const splitPath = path.split('.');

    let resultString = this.currentLocale;

    for (const key of splitPath) {
      resultString = resultString[key];
    }

    return this.interpolation(resultString, placeholder);
  }

  interpolation(string, placeholder) {
    const hasInterpolationKey = !!string.search(this.interpolationKey);

    if (!placeholder && !hasInterpolationKey) {
      return string;
    }

    if (!placeholder && hasInterpolationKey) {
      return string.replaceAll(this.interpolationKey, '');
    }

    let interpolationString = string;

    for (const key of Object.keys(placeholder)) {
      interpolationString = interpolationString.replace(`{{${key}}}`, placeholder[key]);
    }

    return interpolationString.replaceAll(this.interpolationKey, '');
  }
}

export const localizer = reactive(new Localizer());
