import { FREE_DOMAIN } from '../constants/domain.js';

export const generateRandomDomainName = () => {
  return Math.random().toString(16).slice(2);
};

export const generateRandomFreeDomain = () => {
  return `${generateRandomDomainName()}${FREE_DOMAIN}`;
};
