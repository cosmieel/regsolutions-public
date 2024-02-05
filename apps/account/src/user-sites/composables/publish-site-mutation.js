import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchPublishSite = async (siteId) => {
  const result = await api.publish(siteId);

  return result;
};

export function usePublishSiteMutation() {
  return useMutation((siteId) => fetchPublishSite(siteId));
}
