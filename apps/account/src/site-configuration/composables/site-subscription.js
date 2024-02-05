import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/subscriptions-api.js';

export const getSiteSubscriptionById = async (siteId) => await api.getSiteSubscription(siteId);

export function useSiteSubscriptionQuery(siteId) {
  return useQuery(['site-subscription', siteId], () => getSiteSubscriptionById(siteId));
}
