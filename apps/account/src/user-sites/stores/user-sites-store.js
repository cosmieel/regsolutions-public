import { useQueryClient, useIsFetching } from '@tanstack/vue-query';
import { notifyer } from 'account/src/instances/notifyer.js';
import { offsetLimit } from 'account-ui/src/utility/helpers/pagination.js';
import isEmpty from 'lodash/isEmpty';
import { defineStore, storeToRefs } from 'pinia';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IS_ADMIN_PROVIDE_KEY } from '../../app-provider/constants.js';
import { getAllPages } from '../../site-configuration/composables/pages-query.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { useDeleteSiteMutation } from '../composables/delete-site-mutation.js';
import { useDuplicateSiteMutation } from '../composables/duplicate-site-mutation.js';
import { usePublishSiteMutation } from '../composables/publish-site-mutation.js';
import { getAllSitesForAdmin } from '../composables/sites-admin-query.js';
import { getAllSites, useSitesQuery } from '../composables/sites-query.js';
import { useUpdateSiteMutation } from '../composables/update-site-mutation.js';
import { SITES_PER_PAGE } from '../constants.js';

export const useUserSitesStore = defineStore('userSitesStore', () => {
  const route = useRoute();
  const router = useRouter();
  const queryClient = useQueryClient();
  const duplicateSiteMutation = useDuplicateSiteMutation();
  const deleteSiteMutation = useDeleteSiteMutation();
  const updateSiteMutation = useUpdateSiteMutation();
  const publishSiteMutation = usePublishSiteMutation();

  const userAccountStore = useUserAccountStore();
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const sitesList = ref([]);
  const subscriptionNotExistsErrorMessage = ref('');
  const currentSiteId = ref('');
  const mainPages = ref([]);
  const page = ref(route.query.page || 1);
  const total = ref(0);
  const searchValue = ref('');

  const { isLoading, isError, isSuccess, data: sites, error } = useSitesQuery();

  const isAdmin = inject(IS_ADMIN_PROVIDE_KEY);

  const isEmptySearchResult = computed(() => {
    if (isAdmin.value) {
      return isEmpty(sitesList.value);
    }

    return false;
  });

  async function fetchSites(query = {}) {
    if (isAdmin.value) {
      return await queryClient.fetchQuery({
        queryKey: ['sites'],
        queryFn: async () => await getAllSitesForAdmin(query),
      });
    }

    return await queryClient.fetchQuery({
      queryKey: ['sites'],
      queryFn: async () => await getAllSites(query),
    });
  }

  async function fetchSitesListData() {
    const response = await fetchSites({
      domain: searchValue.value,
      ...offsetLimit(page.value, SITES_PER_PAGE),
    });

    sitesList.value = response?.sites || [];
    total.value = response?.totalCount || 0;
  }

  const isFetchingSites = useIsFetching({ queryKey: ['sites'] });

  async function duplicateSiteRequest(id) {
    try {
      await duplicateSiteMutation.mutateAsync({ id });

      if (duplicateSiteMutation.isSuccess.value) {
        await fetchSitesListData();
        await fetchPages();

        notifyer.success({
          message: 'Сайт успешно дублирован',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSiteRequest(id) {
    try {
      await deleteSiteMutation.mutateAsync({ id });

      if (deleteSiteMutation.isSuccess.value) {
        if (sitesList.value.length <= 1) {
          page.value = 1;
        }

        await fetchSitesListData();

        localStorage.removeItem(`freeDomainProps_${id}`);
        localStorage.removeItem(`paidDomainProps_${id}`);

        notifyer.success({
          message: 'Сайт успешно удалён',
        });

        if (!total.value) {
          page.value = 1;
          router.push({ name: 'accountMainEmpty' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateSiteRequest(siteData) {
    let newSiteData;

    const result = await updateSiteMutation.mutateAsync(siteData);

    if (updateSiteMutation.isSuccess.value) {
      newSiteData = result;
    }

    return newSiteData;
  }

  async function publishSiteRequest(id) {
    let newSiteData;

    try {
      const result = await publishSiteMutation.mutateAsync(id);

      if (publishSiteMutation.isSuccess.value) {
        newSiteData = result;

        notifyer.success({
          message: 'Сайт успешно опубликован',
        });
      }

      if (!result.published) {
        setPublishingStatus(result, id);
      }

      queryClient.clear();
    } catch (error) {
      if (error.message === 'error_subscription_not_exists') {
        subscriptionNotExistsErrorMessage.value = error.message;
        currentSiteId.value = id;
      }

      if (error.message === 'error_not_found') {
        router.push({ name: 'pageNotFound' });
      }

      throw error;
    }

    return newSiteData;
  }

  function clearSubscriptionNotExistsError() {
    subscriptionNotExistsErrorMessage.value = '';
    currentSiteId.value = '';
  }

  async function unpublishSiteRequest(id) {
    const data = {
      id,
      published: false,
    };

    const response = await updateSiteRequest(data);

    setPublishingStatus(response, id);

    queryClient.clear();

    return response;
  }

  function setPublishingStatus(newSiteData, id) {
    const foundIndex = sitesList.value.findIndex((site) => site.id === id);

    if (foundIndex !== -1) {
      sitesList.value[foundIndex].published = newSiteData.published;
    }
  }

  async function fetchPages() {
    mainPages.value = [];

    for (const site in sitesList.value) {
      const siteId = sitesList.value[site].id;
      const pagesList = await queryClient.fetchQuery({
        queryKey: ['pages'],
        queryFn: async () => await getAllPages(siteId),
      });

      const mainPageId = pagesList
        .sort((a, b) => b.main - a.main || a.id - b.id)
        .find((page) => page.main === true)?.id;

      if (mainPages.value.length !== sitesList.value.length) {
        mainPages.value.push(mainPageId);
      }
    }

    return mainPages.value;
  }

  async function handleSearch(value) {
    page.value = 1;
    router.push({ name: 'accountMain' });

    if (searchValue.value !== value) {
      searchValue.value = value;

      await fetchSitesListData();
    }
  }

  watch(
    () => route.name,
    async (value) => {
      if (value === 'accountMain') {
        await fetchSitesListData();

        if (sitesList.value?.length > 0) {
          router.push({ name: 'accountMain', query: { ...route.query } });

          await fetchPages();
        }
      }

      clearSubscriptionNotExistsError();
    }
  );

  async function onPageSelect(currentPage) {
    page.value = currentPage;
    await fetchSitesListData();
    await fetchPages();
  }

  onMounted(async () => {
    await fetchSitesListData();
    await fetchPages();
  });

  return {
    sitesList,
    sites,
    isLoading,
    isError,
    isSuccess,
    error,
    duplicateSiteRequest,
    deleteSiteRequest,
    updateSiteRequest,
    publishSiteRequest,
    unpublishSiteRequest,
    fetchSitesListData,
    subscriptionNotExistsErrorMessage,
    clearSubscriptionNotExistsError,
    currentSiteId,
    currentImagesStorage,
    fetchPages,
    mainPages,
    searchValue,
    handleSearch,
    onPageSelect,
    isAdmin,
    isEmptySearchResult,
    total,
    isFetchingSites,
  };
});
