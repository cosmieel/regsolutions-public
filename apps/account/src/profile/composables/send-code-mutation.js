import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/user-api.js';

const fetchSendCode = async (email) => {
  const result = await api.sendEmailUpdateCode(email);

  return result;
};

export function useSendCodeMutation() {
  return useMutation((email) => fetchSendCode(email));
}
