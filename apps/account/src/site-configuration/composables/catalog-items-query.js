import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getAllCatalogItems = async (data, queryParameters) =>
  await api.getAllCatalogItems(data, { queryParameters });

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogItemsQuery(data, queryParameters) {
  return useQuery(['catalogItems'], () => getAllCatalogItems(data, queryParameters), queryOptions);
}
