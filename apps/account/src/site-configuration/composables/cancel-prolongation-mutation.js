import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/subscriptions-api.js';

const fetchCancelProlongation = async (siteId) => {
  const result = await api.cancelProlongation(siteId);

  return result;
};

export function useCancelProlongationMutation() {
  return useMutation((siteId) => fetchCancelProlongation(siteId));
}
