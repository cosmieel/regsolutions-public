import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/pages-api.js';

const fetchCreatePage = async (pageData) => {
  const result = await api.create(pageData);

  return result;
};

export function useCreatePageMutation() {
  return useMutation((pageData) => fetchCreatePage(pageData));
}
