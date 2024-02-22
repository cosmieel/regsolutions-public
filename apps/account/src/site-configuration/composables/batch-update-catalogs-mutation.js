import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchBatchUpdateCatalogs = async (catalogsListData) => {
  const result = api.batchUpdate(catalogsListData);

  return result;
};

export function useBatchUpdateCatalogsMutation() {
  return useMutation((catalogsListData) => fetchBatchUpdateCatalogs(catalogsListData));
}
