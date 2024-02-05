import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/catalog-api.js';

const fetchImportCsvCatalog = async (data) => {
  const result = await api.importCsvCatalog(data);
  return result;
};
const fetchImportBnovoCatalog = async (data) => {
  const result = await api.importBnovoCatalog(data);
  return result;
};

export function useImportCsvCatalogMutation() {
  return useMutation((data) => fetchImportCsvCatalog(data));
}

export function useImportBnovoCatalogMutation() {
  return useMutation((data) => fetchImportBnovoCatalog(data));
}
