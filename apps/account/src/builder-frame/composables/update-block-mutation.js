import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchUpdateBlock = async (blockData) => {
  const result = await api.updateBlock(blockData);

  return result;
};

export function useUpdateBlockMutation() {
  return useMutation((blockData) => fetchUpdateBlock(blockData));
}
