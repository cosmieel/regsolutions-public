import { useMutation } from '@tanstack/vue-query';
import { api } from '../../../api/auth-api.js';

const fetchLogout = async () => {
  const result = await api.logout();

  return result;
};

export function useLogoutMutation() {
  return useMutation(() => fetchLogout());
}
