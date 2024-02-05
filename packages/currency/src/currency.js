import { CODES } from './constants/codes';
import { formatKeyToName } from './formatters/format-key-to-name';
import { formatKeyToSymbol } from './formatters/format-key-to-symbol';

export class Currency {
  constructor() {
    this.codes = CODES;
  }

  checkCode(code) {
    return Object.keys(this.codes).includes(code);
  }

  keyToName(code) {
    return formatKeyToName(code, this.codes);
  }

  keyToSymbol(code) {
    return formatKeyToSymbol(code, this.codes);
  }

  getCurrency(code) {
    return {
      code: this.checkCode(code) ? code : `Unknown code: ${code}`,
      symbol: this.keyToSymbol(code),
      name: this.keyToName(code),
    };
  }
}
