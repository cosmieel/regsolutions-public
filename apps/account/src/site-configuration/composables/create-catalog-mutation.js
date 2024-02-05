import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchCreateCatalog = async (catalogData) => {
  const result = await api.create(catalogData);

  return result;
};

export function useCreateCatalogMutation() {
  return useMutation((catalogData) => fetchCreateCatalog(catalogData));
}
