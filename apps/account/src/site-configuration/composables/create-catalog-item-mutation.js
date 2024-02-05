import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchCreateCatalogItem = async (catalogItemData) => {
  const result = await api.createItem(catalogItemData);

  return result;
};

export function useCreateCatalogItemMutation() {
  return useMutation((catalogItemData) => fetchCreateCatalogItem(catalogItemData));
}
