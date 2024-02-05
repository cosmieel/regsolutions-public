import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getAllCatalogs = async (siteId) => await api.getAllCatalogs(siteId);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogsQuery(siteId) {
  return useQuery(['catalogs'], () => getAllCatalogs(siteId), queryOptions);
}
