import { useQueryClient } from '@tanstack/vue-query';
import { notifyer } from 'account/src/instances/notifyer.js';
import { useDeletedItems } from 'account/src/utility/composition/use-deleted-items';
import { UiButton } from 'account-ui';
import { defineStore, storeToRefs } from 'pinia';
import { computed, markRaw, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogConfigurationStore } from './catalog-configuration-store.js';
import { useSiteConfigurationStore } from './site-configuration-store.js';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { useCatalogItemQuery } from '../composables/catalog-item-query.js';
import { getAllCatalogItems, useCatalogItemsQuery } from '../composables/catalog-items-query.js';
import { useCreateCatalogItemMutation } from '../composables/create-catalog-item-mutation.js';
import { useDeleteCatalogItemMutation } from '../composables/delete-catalog-item-mutation.js';
import { useDuplicateCatalogItemMutation } from '../composables/duplicate-catalog-item-mutation.js';
import { useUpdateCatalogItemMutation } from '../composables/update-catalog-item-mutation.js';

const callSuccessCatalogItemDeletionNotification = (name, onTimerCompleted, onCancel) => {
  notifyer.info({
    message: name ? `Товар “${name}” был удалён` : 'Товары были удалены',
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

export const useCatalogItemsConfigurationStore = defineStore(
  'catalogItemsConfigurationStore',
  () => {
    const queryClient = useQueryClient();
    const route = useRoute();

    const siteConfigurationStore = useSiteConfigurationStore();
    const { siteId } = storeToRefs(siteConfigurationStore);

    const catalogConfigurationStore = useCatalogConfigurationStore();
    const { catalogId } = storeToRefs(catalogConfigurationStore);

    const userAccountStore = useUserAccountStore();
    const { currentImagesStorage } = storeToRefs(userAccountStore);

    const createCatalogItemMutation = useCreateCatalogItemMutation();
    const deleteCatalogItemMutation = useDeleteCatalogItemMutation();
    const duplicateCatalogItemMutation = useDuplicateCatalogItemMutation();
    const updateCatalogItemMutation = useUpdateCatalogItemMutation();
    const uploadMutation = useUploadMutation();

    const currentCatalogItemsList = ref([]);

    const catalogItemId = ref(route.params.catalogItemId);

    const isCatalogItemCreated = ref(false);

    const currentCatalogItemsSortedList = computed(() =>
      currentCatalogItemsList.value.sort((a, b) => a.id - b.id)
    );

    const { deletedItems, addDeletedItem, removeDeletedItem, addSeveral, removeSeveral } =
      useDeletedItems('DELETED_CATALOG_PRODUCT_ITEMS');

    const currentCatalogItemsFilteredList = computed(() =>
      currentCatalogItemsSortedList.value.filter((item) => !deletedItems.value.includes(item.id))
    );

    const {
      isLoading: isCatalogItemsLoading,
      isError: isCatalogItemsError,
      isSuccess: isCatalogItemsSuccess,
      data: catalogItems,
      error: catalogItemsError,
    } = useCatalogItemsQuery(siteId.value);

    const {
      isLoading: isCatalogItemLoading,
      isError: isCatalogItemError,
      isSuccess: isCatalogItemSuccess,
      data: catalogItem,
      error: catalogItemError,
    } = useCatalogItemQuery(siteId.value, catalogId.value, catalogItemId.value);

    async function fetchCatalogItems(siteId, catalogId) {
      try {
        const catalogItemsList = await queryClient.fetchQuery({
          queryKey: ['catalogItems'],
          queryFn: async () => await getAllCatalogItems({ siteId, catalogId }),
        });

        currentCatalogItemsList.value = catalogItemsList || [];
      } catch (error) {
        console.log(error);
      }

      return currentCatalogItemsList.value;
    }

    watch(
      () => route.name,
      async (value) => {
        if (value === 'siteConfigurationCatalogSettings') {
          await fetchCatalogItems(route.params.siteId, route.params.catalogId);
        }
      }
    );

    watch(
      () => route.params.catalogId,
      async (currentCatalogId) => {
        if (currentCatalogId) {
          await fetchCatalogItems(route.params.siteId, currentCatalogId);
        }
      }
    );

    onMounted(async () => {
      if (route.params.catalogId) {
        await fetchCatalogItems(route.params.siteId, route.params.catalogId);
      }
    });

    async function updateActiveState(id, active) {
      try {
        await updateCatalogItemMutation.mutateAsync({
          id,
          active,
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function createCatalogItemRequest(data, isAddInList = true) {
      const responseData = await createCatalogItemMutation.mutateAsync(data);

      if (createCatalogItemMutation.isSuccess.value) {
        if (isAddInList) {
          currentCatalogItemsList.value = [...currentCatalogItemsList.value, responseData];
        }

        return responseData;
      }
    }

    async function updateCatalogItemRequest(data, isWorkWithSameItem = false) {
      const responseData = await updateCatalogItemMutation.mutateAsync(data);

      const foundIndex = currentCatalogItemsList.value.findIndex((item) => item?.id === data?.id);

      if (foundIndex === -1) {
        currentCatalogItemsList.value = [...currentCatalogItemsList.value, responseData];
      } else {
        if (isWorkWithSameItem) {
          currentCatalogItemsList.value[foundIndex] = responseData;
        } else {
          currentCatalogItemsList.value = currentCatalogItemsList.value.filter(
            (item) => item?.id !== data?.id
          );
        }
      }
    }

    async function deleteCatalogItem(identifiers) {
      const ids = Array.isArray(identifiers)
        ? identifiers.length > 1
          ? identifiers
          : identifiers[0]
        : identifiers;

      if (Array.isArray(ids)) {
        const foundItems = currentCatalogItemsList.value.filter((item) => ids.includes(item.id));

        if (foundItems.length > 0) {
          addSeveral(ids);

          callSuccessCatalogItemDeletionNotification(
            null,
            async () => {
              try {
                const response = await Promise.allSettled(
                  ids.map((id) => deleteCatalogItemMutation.mutateAsync(id))
                );

                const result = new Set(
                  response
                    .filter((item) => item.status === 'fulfilled')
                    .map((item) => item.value.id)
                );

                if (result.size > 0) {
                  currentCatalogItemsList.value = currentCatalogItemsList.value.filter(
                    (item) => !result.has(item.id)
                  );
                }
              } finally {
                removeSeveral(ids);
              }
            },
            () => {
              removeSeveral(ids);
            },
            true
          );
        }
      } else {
        const foundItem = currentCatalogItemsList.value.find((item) => item.id === ids);

        if (foundItem) {
          addDeletedItem(foundItem.id);

          callSuccessCatalogItemDeletionNotification(
            foundItem.name,
            () => deleteCatalogItemRequest(foundItem.id),
            () => {
              removeDeletedItem(foundItem.id);
            }
          );
        }
      }
    }

    async function deleteCatalogItemRequest(id) {
      try {
        await deleteCatalogItemMutation.mutateAsync(id);

        if (deleteCatalogItemMutation.isSuccess.value) {
          currentCatalogItemsList.value = currentCatalogItemsList.value.filter((catalogItem) => {
            return catalogItem.id !== id;
          });
        }
      } finally {
        removeDeletedItem(id);
      }
    }

    async function duplicateCatalogItemRequest(ids) {
      if (Array.isArray(ids)) {
        const response = await Promise.allSettled(
          ids.map((id) => duplicateCatalogItemMutation.mutateAsync(id))
        );

        const result = response
          .filter((item) => item.status === 'fulfilled')
          .map((item) => item.value);

        if (result.length > 0) {
          currentCatalogItemsList.value.push(...result);
        }
      } else {
        const result = await duplicateCatalogItemMutation.mutateAsync(ids);

        if (duplicateCatalogItemMutation.isSuccess.value) {
          currentCatalogItemsList.value.push(result);
        }
      }
    }

    async function uploadRequest(file) {
      let data;

      try {
        data = await uploadMutation.mutateAsync({ file });
      } catch (error) {
        console.log(error.message);
      }

      return data;
    }

    return {
      currentCatalogItemsFilteredList,
      isCatalogItemLoading,
      isCatalogItemError,
      isCatalogItemSuccess,
      catalogItem,
      catalogItemError,
      isCatalogItemsLoading,
      isCatalogItemsError,
      isCatalogItemsSuccess,
      catalogItems,
      catalogItemsError,
      createCatalogItemMutation,
      deleteCatalogItemMutation,
      duplicateCatalogItemMutation,
      updateCatalogItemMutation,
      updateActiveState,
      createCatalogItemRequest,
      updateCatalogItemRequest,
      deleteCatalogItemRequest,
      duplicateCatalogItemRequest,
      uploadRequest,
      isCatalogItemCreated,
      currentImagesStorage,
      fetchCatalogItems,
      siteId,
      deleteCatalogItem,
      deletedItems,
    };
  }
);
