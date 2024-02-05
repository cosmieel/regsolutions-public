import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/user-api.js';

const fetchUpdateProfileData = async (data) => {
  const result = await api.updateUser(data);

  return result;
};

export function useUpdateProfileDataMutation() {
  return useMutation((data) => fetchUpdateProfileData(data));
}
