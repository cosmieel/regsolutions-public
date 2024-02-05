import { useIsFetching, useQueryClient } from '@tanstack/vue-query';
import { notifyer } from 'account/src/instances/notifyer.js';
import { useDeletedItems } from 'account/src/utility/composition/use-deleted-items.js';
import { requiredFieldMessage } from 'account/src/utility/validation-rules';
import { UiButton } from 'account-ui';
import { CURRENCY_CODES } from 'currency';
import isEqual from 'lodash.isequal';
import { defineStore, storeToRefs } from 'pinia';
import { computed, markRaw, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { moveArrayItem } from './helpers.js';
import { useSiteConfigurationStore } from './site-configuration-store.js';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { getCatalogById, useCatalogQuery } from '../composables/catalog-query.js';
import { getAllCatalogs, useCatalogsQuery } from '../composables/catalogs-query.js';
import { useCreateCatalogMutation } from '../composables/create-catalog-mutation.js';
import { useDeleteCatalogMutation } from '../composables/delete-catalog-mutation.js';
import {
  useImportCsvCatalogMutation,
  useImportBnovoCatalogMutation,
} from '../composables/import-catalog-mutation.js';
import { useUpdateCatalogMutation } from '../composables/update-catalog-mutation.js';

const callSuccessCatalogDeletionNotification = (name, onTimerCompleted, onCancel) => {
  notifyer.info({
    message: name ? `Каталог “${name}” был удалён` : 'Каталоги были удалены',
    timeOut: 10_000,
    onTimerCompleted,
    action: {
      slotValue: 'Отменить',
      props: {
        'is-ghost-white': true,
      },
      click: onCancel,
      component: markRaw(UiButton),
    },
  });
};

export const useCatalogConfigurationStore = defineStore('catalogConfigurationStore', () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const route = useRoute();

  const siteConfigurationStore = useSiteConfigurationStore();
  const { siteId } = storeToRefs(siteConfigurationStore);

  const userAccountStore = useUserAccountStore();
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const createCatalogMutation = useCreateCatalogMutation();
  const deleteCatalogMutation = useDeleteCatalogMutation();
  const updateCatalogMutation = useUpdateCatalogMutation();
  const importCsvCatalogMutation = useImportCsvCatalogMutation();
  const importBnovoCatalogMutation = useImportBnovoCatalogMutation();
  const uploadMutation = useUploadMutation();

  const currentCatalogsList = ref([]);

  const defaultCheckoutFields = [
    {
      type: 'text',
      label: 'Имя',
      required: false,
    },
    {
      type: 'email',
      label: 'E-mail',
      required: true,
    },
    {
      type: 'tel',
      label: 'Телефон',
      required: false,
    },
  ];
  const defaultCheckoutButton = { text: 'Оформить заказ' };
  const defaultCheckoutTerms = {
    rulesLink: '',
    policyLink: '',
  };
  const defaultCheckoutUrl = '';

  const defaultCatalogData = {
    currency: CURRENCY_CODES.RUB,
    unit: '',
    checkout: {
      type: 'CART',
      fields: [
        {
          type: 'text',
          label: 'Имя',
          required: false,
        },
        {
          type: 'email',
          label: 'E-mail',
          required: true,
        },
        {
          type: 'tel',
          label: 'Телефон',
          required: false,
        },
      ],
      button: {
        text: 'Оформить заказ',
      },
      terms: {
        rulesLink: '',
        policyLink: '',
      },
    },
    button: { text: '' },
  };

  const currentCatalog = ref({
    siteId: route.params.siteId,
    ...defaultCatalogData,
  });

  const currentCheckout = computed(() => currentCatalog.value.checkout);

  const catalogId = ref(Number(route.params.catalogId));
  const catalogDataToUpdate = ref({});
  const isCatalogFetching = ref(false);

  const catalogCsvErrorMessage = ref('');
  const isCatalogCsvLoading = ref(false);

  const bnovoCatalogErrorMessage = ref('');
  const isBnovoCatalogLoading = ref(false);

  const catalogNameErrorMessage = ref('');

  const needShowSavingDataNotification = ref(false);

  const {
    isLoading: isCatalogsLoading,
    isError: isCatalogsError,
    isSuccess: isCatalogsSuccess,
    data: catalogs,
    error: catalogsError,
    fetchStatus: catalogsFetchStatus,
  } = useCatalogsQuery(siteId.value);

  const {
    isLoading: isCatalogLoading,
    isError: isCatalogError,
    isSuccess: isCatalogSuccess,
    data: catalog,
    error: catalogError,
    fetchStatus: catalogFetchStatus,
  } = useCatalogQuery(siteId.value, catalogId.value);

  const isFetching = useIsFetching();

  const { deletedItems, removeDeletedItem, addDeletedItem, addSeveral, removeSeveral } =
    useDeletedItems('DELETED_CATALOG_ITEMS');

  const currentCatalogsListFiltered = computed(() =>
    currentCatalogsList.value.filter((item) => !deletedItems.value.includes(item.id))
  );

  watch(isFetching, (value) => {
    if (route.name === 'siteConfigurationCatalogSettings') {
      isCatalogFetching.value = value;
    }
  });

  function addCheckoutField(newField) {
    currentCatalog.value.checkout.fields.push(newField);
  }

  function deleteCheckoutField(fieldIndex) {
    currentCatalog.value.checkout.fields.splice(fieldIndex, 1);
  }

  function updateCheckoutField(newField, fieldIndex) {
    currentCatalog.value.checkout.fields[fieldIndex] = newField;
  }

  function moveCheckoutField(fromIndex, toIndex) {
    moveArrayItem(currentCatalog.value.checkout.fields, fromIndex, toIndex);
  }

  function renameCheckoutField(itemIndex, newName) {
    currentCatalog.value.checkout.fields[itemIndex].label = newName;
  }

  function toggleRequiredCheckoutField(itemIndex) {
    currentCatalog.value.checkout.fields[itemIndex].required =
      !currentCatalog.value.checkout.fields[itemIndex].required;
  }

  function setButtonLabel(label) {
    currentCatalog.value.checkout.button.text = label;
  }

  function addTerms() {
    currentCatalog.value.checkout.terms = {
      rulesLink: '',
      policyLink: '',
    };
  }

  function setTerms(terms) {
    currentCatalog.value.checkout.terms = terms;
  }

  function deleteTerms() {
    currentCatalog.value.checkout.terms = null;
  }

  async function fetchCatalogs(siteId) {
    try {
      const catalogsList = await queryClient.fetchQuery({
        queryKey: ['catalogs'],
        queryFn: async () => await getAllCatalogs(siteId),
      });

      currentCatalogsList.value = catalogsList.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.log(error);
    }

    return currentCatalogsList.value;
  }

  async function setCurrentCatalogValue(siteId, catalogId) {
    const fetchedCatalog = await queryClient.fetchQuery({
      queryKey: ['catalog', String(catalogId)],
      queryFn: async () => await getCatalogById({ siteId, catalogId }),
    });

    currentCatalog.value = { ...currentCatalog.value, ...fetchedCatalog };
  }

  watch(
    () => route.name,
    async (value) => {
      if (value === 'siteConfigurationCatalogs') {
        await fetchCatalogs(route.params.siteId);
      }
    }
  );

  watch(
    () => route.params.siteId,
    (currentSiteId) => {
      if (currentSiteId) {
        resetCatalogDataToCreate(currentSiteId);
      }
    }
  );

  watch(isCatalogSuccess, async (value) => {
    if (value) {
      await setCurrentCatalogValue(siteId.value, catalogId.value);

      catalogDataToUpdate.value = {};
    }
  });

  watch(
    () => route.params.catalogId,
    async (currentCatalogId) => {
      if (currentCatalogId && route.name === 'siteConfigurationCatalogSettings') {
        await setCurrentCatalogValue(siteId.value, currentCatalogId);

        catalogDataToUpdate.value = {};
      }
    }
  );

  watch(
    () => route.name,
    async (value) => {
      if (value === 'siteConfigurationCatalogCreate') {
        resetCatalogDataToCreate(route.params.siteId);
      }
    }
  );

  onMounted(async () => {
    await fetchCatalogs(route.params.siteId);

    if (route.name === 'siteConfigurationCatalogSettings') {
      await setCurrentCatalogValue(siteId.value, catalogId.value);

      catalogDataToUpdate.value = {};
    }
  });

  const clonedCatalogData = computed(() => JSON.parse(JSON.stringify(currentCatalog.value)));
  const setDataForUpdateRequest = (catalogProps, oldCatalogProps) => {
    const catalogPropsEntries = Object.entries(catalogProps);

    catalogPropsEntries.map(([key, value]) => {
      if (typeof value !== 'object' && oldCatalogProps[key] !== value) {
        catalogDataToUpdate.value[key] = value;
      }

      if (typeof value === 'object') {
        for (const property in value) {
          if (!isEqual(oldCatalogProps[key]?.[property], value[property])) {
            catalogDataToUpdate.value[key] = {
              [property]: value[property],
              ...value,
            };
          }
        }
      }
    });
  };

  watch(
    clonedCatalogData,
    (catalogProps, oldCatalogProps) => {
      setDataForUpdateRequest(catalogProps, oldCatalogProps);
    },
    { deep: true }
  );

  watch(
    catalogDataToUpdate,
    (value) => {
      setValidCheckoutDataObject(value);

      needShowSavingDataNotification.value = Object.values(value).filter((value) => !!value).length;
    },
    { deep: true }
  );

  async function updateCatalogData() {
    await updateCatalogRequest({
      id: currentCatalog.value.id,
      ...catalogDataToUpdate.value,
    });

    catalogDataToUpdate.value = {};
  }

  async function updateActiveState(id, active) {
    try {
      await updateCatalogMutation.mutateAsync({
        id,
        active,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function validateCatalog() {
    if (!currentCatalog.value.name) {
      catalogNameErrorMessage.value = requiredFieldMessage;

      return;
    }

    return true;
  }

  async function createCatalogRequest() {
    setValidCheckoutDataObject(currentCatalog.value);

    const isValid = validateCatalog();

    if (!isValid) {
      return;
    }

    try {
      const data = await createCatalogMutation.mutateAsync(currentCatalog.value);

      if (createCatalogMutation.isSuccess.value) {
        router.push({ name: 'siteConfigurationCatalogSettings', params: { catalogId: data.id } });

        await fetchCatalogs(route.params.siteId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCatalogRequest(catalogData) {
    const isValid = validateCatalog();

    if (!isValid) {
      return;
    }

    let newCatalogData;

    try {
      const result = await updateCatalogMutation.mutateAsync(catalogData);

      if (updateCatalogMutation.isSuccess.value) {
        newCatalogData = result;
      }
    } catch (error) {
      console.log(error);
    }

    return newCatalogData;
  }

  async function deleteCatalog(identifiers) {
    const ids = Array.isArray(identifiers)
      ? identifiers.length > 1
        ? identifiers
        : identifiers[0]
      : identifiers;

    if (Array.isArray(ids)) {
      const foundItems = currentCatalogsList.value.filter((item) => ids.includes(item.id));

      if (foundItems.length > 0) {
        addSeveral(ids);

        callSuccessCatalogDeletionNotification(
          null,
          async () => {
            try {
              const response = await Promise.allSettled(
                ids.map((id) => deleteCatalogMutation.mutateAsync(id))
              );

              const result = new Set(
                response.filter((item) => item.status === 'fulfilled').map((item) => item.value.id)
              );

              if (result.size > 0) {
                currentCatalogsList.value = currentCatalogsList.value.filter(
                  (item) => !result.has(item.id)
                );
              }
            } finally {
              removeSeveral(ids);
            }
          },
          () => {
            removeSeveral(ids);
          }
        );
      }
    } else {
      const foundItem = currentCatalogsList.value.find((catalog) => {
        return catalog.id === ids;
      });

      if (foundItem) {
        addDeletedItem(foundItem.id);

        callSuccessCatalogDeletionNotification(
          foundItem.name,
          () => deleteCatalogRequest(foundItem.id),
          () => {
            removeDeletedItem(foundItem.id);
          }
        );
      }
    }
  }

  async function deleteCatalogRequest(id) {
    try {
      await deleteCatalogMutation.mutateAsync(id);

      if (deleteCatalogMutation.isSuccess.value) {
        currentCatalogsList.value = currentCatalogsList.value.filter((catalog) => {
          return catalog.id !== id;
        });
      }
    } finally {
      removeDeletedItem(id);
    }
  }

  async function importCsvCatalogRequest(csvCatalog) {
    try {
      catalogCsvErrorMessage.value = '';
      isCatalogCsvLoading.value = true;

      const data = await importCsvCatalogMutation.mutateAsync({
        siteId: route.params.siteId,
        file: csvCatalog,
      });

      if (importCsvCatalogMutation.isSuccess.value) {
        currentCatalogsList.value = data.sort((a, b) => a.id - b.id);

        isCatalogCsvLoading.value = false;
      }
    } catch (error) {
      catalogCsvErrorMessage.value = error.message;
      isCatalogCsvLoading.value = false;
    }
  }

  async function importBnovoCatalogRequest(bnovoCatalogId) {
    try {
      isBnovoCatalogLoading.value = true;

      const data = await importBnovoCatalogMutation.mutateAsync({
        siteId: route.params.siteId,
        bnovoCatalogId,
      });

      if (importBnovoCatalogMutation.isSuccess.value) {
        isBnovoCatalogLoading.value = false;
        let catalog = currentCatalogsList.value.find((catalog) => catalog.id === data.id);
        catalog ? (catalog = data) : currentCatalogsList.value.push(data);
      }
    } catch (error) {
      bnovoCatalogErrorMessage.value = error.message;
      isBnovoCatalogLoading.value = false;
    }
  }

  async function uploadRequest(file) {
    try {
      const data = await uploadMutation.mutateAsync({ file });

      if (uploadMutation.isSuccess.value) {
        currentCatalog.value.image = data.url;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function resetCatalogDataToCreate(currentSiteId) {
    currentCatalog.value = {
      siteId: currentSiteId,
      ...defaultCatalogData,
    };
  }

  const needCatalogSaveButtonDisable = computed(() => {
    return Object.values(catalogDataToUpdate.value).filter((value) => value !== null).length === 0;
  });

  watch(
    () => currentCatalog.value.name,
    () => {
      catalogNameErrorMessage.value = '';
    },
    { deep: true }
  );

  watch(
    () => currentCatalog,
    (currentValue) => {
      if (currentValue.value.checkout.type === 'FORM') {
        if (!currentValue.value.checkout?.fields) {
          currentValue.value.checkout.fields = defaultCheckoutFields;
        }

        if (!currentValue.value.checkout?.button) {
          currentValue.value.checkout.button = defaultCheckoutButton;
        }

        if (!currentValue.value.checkout?.terms) {
          currentValue.value.checkout.terms = defaultCheckoutTerms;
        }

        if (!currentValue.value.checkout?.url) {
          delete currentValue.value.checkout.url;
        }
      }

      if (currentValue.value.checkout.type === 'URL') {
        if (!currentValue.value.checkout?.url) {
          currentValue.value.checkout.url = defaultCheckoutUrl;
        }

        setValidCheckoutDataObject(currentValue.value);
      }

      if (currentValue.value.checkout.type === 'CART') {
        setValidCheckoutDataObject(currentValue.value);
      }
    },
    { deep: true }
  );

  function clearSavingDataNotification() {
    needShowSavingDataNotification.value = false;
  }

  function clearCatalogCsvErrorMessage() {
    catalogCsvErrorMessage.value = '';
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function setValidCheckoutDataObject(currentCatalogData) {
    if (currentCatalogData.checkout?.type === 'URL') {
      delete currentCatalogData.checkout.fields;
      delete currentCatalogData.checkout.button;
      delete currentCatalogData.checkout.terms;
    }

    if (currentCatalogData.checkout?.type === 'CART') {
      delete currentCatalogData.checkout.fields;
      delete currentCatalogData.checkout.button;
      delete currentCatalogData.checkout.terms;
      delete currentCatalogData.checkout.url;
    }

    if (currentCatalogData.checkout?.type === 'FORM') {
      delete currentCatalogData.checkout.url;
    }
  }

  function handleClearCurrentCatalogsList() {
    currentCatalogsList.value = [];
  }

  return {
    currentCatalogsList,
    currentCatalog,
    currentCheckout,
    catalogDataToUpdate,
    needCatalogSaveButtonDisable,
    isCatalogLoading,
    isCatalogError,
    isCatalogSuccess,
    catalog,
    catalogError,
    catalogFetchStatus,
    isCatalogsLoading,
    isCatalogsError,
    isCatalogsSuccess,
    catalogs,
    catalogsError,
    catalogsFetchStatus,
    createCatalogMutation,
    deleteCatalogMutation,
    updateCatalogMutation,
    updateCatalogData,
    updateActiveState,
    createCatalogRequest,
    updateCatalogRequest,
    deleteCatalog,
    deleteCatalogRequest,
    importCsvCatalogRequest,
    importBnovoCatalogRequest,
    uploadRequest,
    isCatalogFetching,
    catalogId,
    catalogCsvErrorMessage,
    isCatalogCsvLoading,
    catalogNameErrorMessage,
    bnovoCatalogErrorMessage,
    isBnovoCatalogLoading,
    addCheckoutField,
    deleteCheckoutField,
    updateCheckoutField,
    moveCheckoutField,
    renameCheckoutField,
    addTerms,
    setTerms,
    deleteTerms,
    toggleRequiredCheckoutField,
    setButtonLabel,
    clearSavingDataNotification,
    needShowSavingDataNotification,
    clearCatalogCsvErrorMessage,
    currentImagesStorage,
    fetchCatalogs,
    handleClearCurrentCatalogsList,
    currentCatalogsListFiltered,
    deletedItems,
  };
});
