import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchUpdateSite = async (siteData) => {
  const result = await api.update(siteData);

  return result;
};

export function useUpdateSiteMutation() {
  return useMutation((siteData) => fetchUpdateSite(siteData));
}
