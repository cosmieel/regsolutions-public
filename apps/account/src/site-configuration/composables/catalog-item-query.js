import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getCatalogItemById = async (data) => await api.getCatalogItemById(data);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogItemQuery(data) {
  return useQuery(
    ['catalogItem', data.catalogItemId],
    () => getCatalogItemById(data),
    queryOptions
  );
}
