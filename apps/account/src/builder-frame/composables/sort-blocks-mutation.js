import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchSortBlocks = async (blockData) => {
  const result = await api.sortBlocks(blockData);

  return result;
};

export function useSortBlocksMutation() {
  return useMutation((blockData) => fetchSortBlocks(blockData));
}
