import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getAllCatalogItems = async (data) => await api.getAllCatalogItems(data);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogItemsQuery(data) {
  return useQuery(['catalogItems'], () => getAllCatalogItems(data), queryOptions);
}
