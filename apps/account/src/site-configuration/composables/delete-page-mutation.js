import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

const fetchDeletePage = async (pageId) => {
  const result = await api.delete(pageId);

  return result;
};

export function useDeletePageMutation() {
  return useMutation((pageId) => fetchDeletePage(pageId));
}
