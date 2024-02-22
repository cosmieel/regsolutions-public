import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchBatchUpdateCatalogItems = async (catalogItemsListData) => {
  const result = await api.batchUpdateItems(catalogItemsListData);

  return result;
};

export function useBatchUpdateCatalogItemsMutation() {
  return useMutation((catalogItemsListData) => fetchBatchUpdateCatalogItems(catalogItemsListData));
}
