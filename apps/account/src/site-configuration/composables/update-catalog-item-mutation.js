import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchUpdateCatalogItem = async (catalogItemData) => {
  const result = await api.updateItem(catalogItemData);

  return result;
};

export function useUpdateCatalogItemMutation() {
  return useMutation((catalogItemData) => fetchUpdateCatalogItem(catalogItemData));
}
