import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchDuplicateCatalogItem = async (catalogItemId) => {
  const result = await api.duplicateItem(catalogItemId);

  return result;
};

export function useDuplicateCatalogItemMutation() {
  return useMutation((catalogItemId) => fetchDuplicateCatalogItem(catalogItemId));
}
