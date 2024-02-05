import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchDuplicateSite = async (siteId) => {
  const result = await api.duplicate(siteId);

  return result;
};

export function useDuplicateSiteMutation() {
  return useMutation((siteId) => fetchDuplicateSite(siteId));
}
