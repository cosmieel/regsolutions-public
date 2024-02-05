import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchValidateDomain = async (domain) => {
  const result = await api.validateDomain(domain);

  return result;
};

export function useValidateDomainMutation() {
  return useMutation((domain) => fetchValidateDomain(domain));
}
