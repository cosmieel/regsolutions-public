import { protocolPattern } from './patterns.js';

export const removeProtocolFromUrl = (value) => {
  return value.replace(protocolPattern, '');
};
