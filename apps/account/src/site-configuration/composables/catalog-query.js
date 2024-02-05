import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

export const getCatalogById = async (data) => await api.getCatalogById(data);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useCatalogQuery(data) {
  return useQuery(['catalog', data.catalogId], () => getCatalogById(data), queryOptions);
}
