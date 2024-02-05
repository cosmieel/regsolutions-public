import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/subscriptions-api.js';

export const getSiteInvoicesById = async (siteId) => await api.getSiteInvoices(siteId);

export function useSiteInvoicesQuery(siteId) {
  return useQuery(['site-invoices', siteId], () => getSiteInvoicesById(siteId));
}
