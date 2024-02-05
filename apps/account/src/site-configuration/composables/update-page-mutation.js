import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

const fetchUpdatePage = async (pageData) => {
  const result = await api.update(pageData);

  return result;
};

export function useUpdatePageMutation() {
  return useMutation((pageData) => fetchUpdatePage(pageData));
}
