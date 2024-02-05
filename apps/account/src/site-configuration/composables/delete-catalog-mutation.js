import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchDeleteCatalog = async (catalogId) => {
  const result = await api.delete(catalogId);

  return result;
};

export function useDeleteCatalogMutation() {
  return useMutation((catalogId) => fetchDeleteCatalog(catalogId));
}
