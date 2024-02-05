import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

export const getSiteById = async (siteId) =>
  await api.getSiteById(siteId, {
    queryParameters: { countChanges: true },
  });

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useSiteQuery(siteId) {
  return useQuery(['site', siteId], () => getSiteById(siteId), queryOptions);
}
