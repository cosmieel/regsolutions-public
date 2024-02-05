import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/sites-api.js';

const fetchUpload = async (file, abortSignal) => {
  const result = await api.upload(file, abortSignal);

  return result;
};

export function useUploadMutation() {
  return useMutation((file, abortSignal) => fetchUpload(file, abortSignal));
}
