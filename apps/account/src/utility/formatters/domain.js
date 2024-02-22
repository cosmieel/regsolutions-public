import { FREE_DOMAIN } from '../constants/domain.js';

export const formatDomain = (value, domain = FREE_DOMAIN) => {
  return `${(value || '').replaceAll(domain, '')}${domain}`;
};
