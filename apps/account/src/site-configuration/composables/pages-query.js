import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

export const getAllPages = async (siteId) => await api.getAllPages(siteId);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function usePagesQuery(siteId) {
  return useQuery(['pages'], () => getAllPages(siteId), queryOptions);
}
