import { useQueryClient } from '@tanstack/vue-query';
import isEqual from 'lodash.isequal';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSiteConfigurationStore } from './site-configuration-store.js';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { useCreatePageMutation } from '../composables/create-page-mutation.js';
import { useDeletePageMutation } from '../composables/delete-page-mutation.js';
import { useDuplicatePageMutation } from '../composables/duplicate-page-mutation.js';
import { getPageById, usePageQuery } from '../composables/page-query.js';
import { useUpdatePageMutation } from '../composables/update-page-mutation.js';

export const usePageConfigurationStore = defineStore('pageConfigurationStore', () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const route = useRoute();

  const siteConfigurationStore = useSiteConfigurationStore();
  const { currentPagesList } = storeToRefs(siteConfigurationStore);

  const userAccountStore = useUserAccountStore();
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const createPageMutation = useCreatePageMutation();
  const deletePageMutation = useDeletePageMutation();
  const duplicatePageMutation = useDuplicatePageMutation();
  const updatePageMutation = useUpdatePageMutation();
  const uploadMutation = useUploadMutation();

  const currentPage = ref('');
  const pageId = ref(route.params.pageId);
  const pageDataToUpdate = ref({});

  const needShowSavingDataNotification = ref(false);

  const { isLoading, isError, isSuccess, data: page, error } = usePageQuery(pageId.value);

  function setCurrentPage(value) {
    currentPage.value = value;
  }

  async function setCurrentPageValue(pageId) {
    const fetchedPage = await queryClient.fetchQuery({
      queryKey: ['page', String(pageId)],
      queryFn: async () => await getPageById(pageId),
    });

    setCurrentPage(fetchedPage);

    pageDataToUpdate.value = {};
  }

  watch(isSuccess, async (value) => {
    if (value) {
      await setCurrentPageValue(pageId.value);

      setTimeout(() => {
        pageDataToUpdate.value = {};
      }, 0);
    }
  });

  watch(
    () => route.params.pageId,
    async (currentPageId) => {
      if (currentPageId) {
        await setCurrentPageValue(currentPageId);

        setTimeout(() => {
          pageDataToUpdate.value = {};
        }, 0);
      }
    },
    {
      immediate: true,
    }
  );

  watch(
    currentPagesList,
    (pages) => {
      if (currentPage.value?.title) {
        setCurrentPageTitleInPageSettings(pages, currentPage.value);
      }
    },
    { deep: true }
  );

  watch(
    currentPage,
    (value) => {
      setCurrentPageTitleInPagesList(value);
    },
    { deep: true }
  );

  const clonedPageData = computed(() => JSON.parse(JSON.stringify(currentPage.value)));
  const setDataForUpdateRequest = (pageProps, oldPageProps) => {
    const pagePropsEntries = Object.entries(pageProps);

    pagePropsEntries.map(([key, value]) => {
      if (typeof value !== 'object' && oldPageProps[key] !== value) {
        pageDataToUpdate.value[key] = value;
      }

      if (typeof value === 'object') {
        for (const property in value) {
          if (!isEqual(oldPageProps[key]?.[property], value[property])) {
            pageDataToUpdate.value[key] = {
              [property]: value[property],
              ...value,
            };
          }
        }
      }
    });
  };

  watch(
    clonedPageData,
    (pageProps, oldPageProps) => {
      setDataForUpdateRequest(pageProps, oldPageProps);
    },
    { deep: true }
  );

  watch(
    pageDataToUpdate,
    (value) => {
      needShowSavingDataNotification.value = Object.getOwnPropertyNames(value).length;
    },
    { deep: true }
  );

  async function updateCurrentPageData(data) {
    if (data) {
      await updatePageRequest({
        id: currentPage.value.id,
        ...data,
      });

      currentPage.value = { ...currentPage.value, ...data };

      // TODO Временно, до полного перехода на VeeValidate
      setTimeout(() => {
        pageDataToUpdate.value = {};
      }, 0);
    }
  }

  async function updatePageData(id = currentPage.value.id, dataToUpdate = pageDataToUpdate.value) {
    if (dataToUpdate && 'blocks' in dataToUpdate) {
      const blocks = dataToUpdate.blocks.map(Number);

      delete dataToUpdate.blocks;

      dataToUpdate = {
        blocks,
        ...dataToUpdate,
      };
    }

    await updatePageRequest({
      id,
      ...dataToUpdate,
    });

    pageDataToUpdate.value = {};
  }

  async function createPageRequest() {
    const pageData = {
      name: 'New page',
      title: 'Страница',
      head: '',
      search: true,
    };

    try {
      const newPage = await createPageMutation.mutateAsync({
        siteId: route.params.siteId,
        ...pageData,
      });

      if (createPageMutation.isSuccess.value) {
        currentPagesList.value.push(newPage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePageRequest(pageData) {
    let newPageData;

    // eslint-disable-next-line no-useless-catch
    try {
      const result = await updatePageMutation.mutateAsync(pageData);

      if (updatePageMutation.isSuccess.value) {
        newPageData = result;
      }
    } catch (error) {
      throw error;
    }

    return newPageData;
  }

  async function deletePageRequest(id) {
    try {
      await deletePageMutation.mutateAsync({ id });

      if (deletePageMutation.isSuccess.value) {
        await siteConfigurationStore.fetchPages(route.params.siteId);

        if (route.name === 'frame') {
          router.push({
            name: 'frame',
            params: {
              site: route.params.siteId,
              pageId: currentPagesList.value[0].id,
            },
          });
        }

        if (route.name === 'siteConfigurationPage') {
          router.push({
            name: 'siteConfigurationPage',
            params: { pageId: currentPagesList.value[0].id },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function duplicatePageRequest(id) {
    try {
      const newPageData = await duplicatePageMutation.mutateAsync({ id });

      if (duplicatePageMutation.isSuccess.value) {
        currentPagesList.value.push(newPageData);
        router.push({
          name: 'siteConfigurationPage',
          params: { pageId: newPageData.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadRequest(file) {
    try {
      const data = await uploadMutation.mutateAsync({ file });

      if (uploadMutation.isSuccess.value) {
        currentPage.value.image = data.url;
      }
    } catch {
      console.log('');
    }
  }

  async function makeMain(id) {
    await updatePageRequest({
      id,
      main: true,
    });

    await siteConfigurationStore.fetchPages(route.params.siteId);
  }

  async function setPageVisibility(id, active) {
    await updatePageRequest({
      id,
      active,
    });

    await siteConfigurationStore.fetchPages(route.params.siteId);
  }

  function setCurrentPageTitleInPagesList(currentPage) {
    currentPagesList.value
      .filter((page) => page.id === currentPage?.id)
      .map((page) => {
        page.title = currentPage?.title;
      });
  }

  function setCurrentPageTitleInPageSettings(currentPagesList) {
    currentPagesList
      .filter((page) => page.id === currentPage?.value?.id)
      .map((page) => {
        currentPage.value.title = page.title;
      });
  }

  function clearSavingDataNotification() {
    needShowSavingDataNotification.value = false;
  }

  function clearPagesData() {
    setCurrentPage('');

    siteConfigurationStore.handleClearCurrentPagesList();
  }

  return {
    page,
    currentPage,
    isLoading,
    isError,
    isSuccess,
    error,
    pageDataToUpdate,
    updatePageData,
    createPageRequest,
    updatePageRequest,
    deletePageRequest,
    duplicatePageRequest,
    uploadRequest,
    clearSavingDataNotification,
    needShowSavingDataNotification,
    currentImagesStorage,
    makeMain,
    setPageVisibility,
    clearPagesData,
    updateCurrentPageData,
  };
});
