import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/subscriptions-api.js';

const fetchCreateSubscription = async ({ siteId, planId, promo }) => {
  const result = await api.createSubscription({ siteId, planId: planId.toString(), promo });

  return result;
};

export function useCreateSubscriptionMutation() {
  return useMutation((subscriptionData) => fetchCreateSubscription(subscriptionData));
}
