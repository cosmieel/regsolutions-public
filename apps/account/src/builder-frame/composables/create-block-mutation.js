import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchCreateBlock = async (blockData) => {
  const result = await api.createBlock(blockData);

  return result;
};

export function useCreateBlockMutation() {
  return useMutation((blockData) => fetchCreateBlock(blockData));
}
