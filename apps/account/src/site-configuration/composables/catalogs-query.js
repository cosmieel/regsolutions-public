import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getAllCatalogs = async (siteId, queryParameters) =>
  await api.getAllCatalogs(siteId, { queryParameters });

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogsQuery(siteId, queryParameters) {
  return useQuery(['catalogs'], () => getAllCatalogs(siteId, queryParameters), queryOptions);
}
