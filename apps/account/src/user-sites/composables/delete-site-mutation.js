import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchDeleteSite = async (siteId) => {
  const result = await api.delete(siteId);

  return result;
};

export function useDeleteSiteMutation() {
  return useMutation((siteId) => fetchDeleteSite(siteId));
}
