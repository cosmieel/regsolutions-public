import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

export const getPageById = async (pageId) => await api.getPageById(pageId);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function usePageQuery(pageId) {
  return useQuery(['page', pageId], () => getPageById(pageId), queryOptions);
}
