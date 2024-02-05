import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchDeleteBlock = async (blockData) => {
  const result = await api.deleteBlock(blockData);

  return result;
};

export function useDeleteBlockMutation() {
  return useMutation((blockData) => fetchDeleteBlock(blockData));
}
