import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchLookupDomain = async (domain) => {
  const result = await api.lookupDomain(domain);

  return result;
};

const fetchLookupDomainNew = async (domain) => {
  return await api.lookupDomainNew(domain);
};

export function useLookupDomainMutation() {
  return useMutation((domain) => fetchLookupDomain(domain));
}

export function useLookupDomainMutationNew() {
  return useMutation((domain) => fetchLookupDomainNew(domain));
}
