import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

export const getAllSitesForAdmin = async (queryParameters) =>
  await api.getAllForAdmin({ ...queryParameters });

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useSitesAdminQuery(queryParameters) {
  return useQuery(['sites'], () => getAllSitesForAdmin(queryParameters), queryOptions);
}
