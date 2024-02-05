import { useMutation } from '@tanstack/vue-query';
import { api } from '../../../api/auth-api.js';

const fetchSendCode = async (email) => {
  const result = await api.sendCode(email);

  return result;
};

export function useSendCodeMutation() {
  return useMutation((email) => fetchSendCode(email));
}
