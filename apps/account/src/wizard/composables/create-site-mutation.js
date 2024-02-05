import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchCreateSite = async (data) => {
  const result = await api.create(data);

  return result;
};

export function useCreateSiteMutation() {
  return useMutation((data) => fetchCreateSite(data));
}
