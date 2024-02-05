import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchDuplicateBlock = async (blockData) => {
  const result = await api.duplicateBlock(blockData);

  return result;
};

export function useDuplicateBlockMutation() {
  return useMutation((blockData) => fetchDuplicateBlock(blockData));
}
