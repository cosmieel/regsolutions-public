import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchLookupDomain = async (domain) => {
  const result = await api.lookupDomain(domain);

  return result;
};

export function useLookupDomainMutation() {
  return useMutation((domain) => fetchLookupDomain(domain));
}
