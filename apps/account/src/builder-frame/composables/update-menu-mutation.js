import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/builder-api.js';

const fetchUpdateMenu = async (menuData) => {
  const result = await api.updateMenu(menuData);

  return result;
};

export function useUpdateMenuMutation() {
  return useMutation((menuData) => fetchUpdateMenu(menuData));
}
