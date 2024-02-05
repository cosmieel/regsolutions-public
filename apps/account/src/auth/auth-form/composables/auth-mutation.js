import { useMutation } from '@tanstack/vue-query';
import { api } from '../../../api/auth-api.js';

const fetchAuth = async (authData) => {
  const result = await api.auth(authData);

  return result;
};

export function useAuthMutation() {
  return useMutation((authData) => fetchAuth(authData));
}
