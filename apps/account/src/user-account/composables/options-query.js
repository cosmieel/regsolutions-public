import { useQuery } from '@tanstack/vue-query';
import { api } from '../../api/options-api.js';

export const getOptions = async () => await api.getOptions();

const queryOptions = {
  enabled: true,
  staleTime: 5 * 60 * 1000,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
};

export function useOptionsQuery() {
  return useQuery(['options'], getOptions, queryOptions);
}
