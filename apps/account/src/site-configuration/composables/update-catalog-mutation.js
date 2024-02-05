import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchUpdateCatalog = async (catalogData) => {
  const result = await api.update(catalogData);

  return result;
};

export function useUpdateCatalogMutation() {
  return useMutation((catalogData) => fetchUpdateCatalog(catalogData));
}
