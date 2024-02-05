import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

export const getBlocks = async (pageId) => await api.getBlocks(pageId);

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useBlocksQuery(pageId) {
  return useQuery(['blocks'], () => getBlocks(pageId), queryOptions);
}
