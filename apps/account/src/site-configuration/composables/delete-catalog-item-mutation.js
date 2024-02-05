import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchDeleteCatalogItem = async (catalogItemId) => {
  const result = await api.deleteItem(catalogItemId);

  return result;
};

export function useDeleteCatalogItemMutation() {
  return useMutation((catalogItemId) => fetchDeleteCatalogItem(catalogItemId));
}
