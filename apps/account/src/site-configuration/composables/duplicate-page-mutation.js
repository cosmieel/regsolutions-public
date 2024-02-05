import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

const fetchDuplicatePage = async (pageId) => {
  const result = await api.duplicate(pageId);

  return result;
};

export function useDuplicatePageMutation() {
  return useMutation((pageId) => fetchDuplicatePage(pageId));
}
