import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/subscriptions-api.js';

export const getSubscriptionPlans = async () => await api.getSubscriptionPlans();

const queryOptions = {
  enabled: false,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export function useSubscriptionPlansQuery() {
  return useQuery(['site-subscription'], () => getSubscriptionPlans(), queryOptions);
}
