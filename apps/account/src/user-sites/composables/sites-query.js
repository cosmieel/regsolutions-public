import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

export const getAllSites = async (queryParameters) => await api.getAll({ ...queryParameters });

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useSitesQuery(queryParameters) {
  return useQuery(['sites'], () => getAllSites(queryParameters), queryOptions);
}
