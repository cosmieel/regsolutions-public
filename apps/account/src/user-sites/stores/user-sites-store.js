import { useQueryClient } from '@tanstack/vue-query';
import { notifyer } from 'account/src/instances/notifyer.js';
import { defineStore, storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAllPages } from '../../site-configuration/composables/pages-query.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { useDeleteSiteMutation } from '../composables/delete-site-mutation.js';
import { useDuplicateSiteMutation } from '../composables/duplicate-site-mutation.js';
import { usePublishSiteMutation } from '../composables/publish-site-mutation.js';
import { getAllSites, useSitesQuery } from '../composables/sites-query.js';
import { useUpdateSiteMutation } from '../composables/update-site-mutation.js';

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

  const sitesList = ref('');
  const subscriptionNotExistsErrorMessage = ref('');
  const currentSiteId = ref('');
  const mainPages = ref([]);

  const { isLoading, isError, isSuccess, data: sites, error } = useSitesQuery();

  async function fetchSitesListData() {
    sitesList.value = await queryClient.fetchQuery({
      queryKey: ['sites'],
      queryFn: async () => await getAllSites(),
    });

    sitesList.value = sitesList.value.sort(
      (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)
    );
  }

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
        await fetchSitesListData();

        localStorage.removeItem(`freeDomainProps_${id}`);
        localStorage.removeItem(`paidDomainProps_${id}`);

        notifyer.success({
          message: 'Сайт успешно удалён',
        });
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

  watch(
    () => route.name,
    async (value) => {
      if (value === 'accountMain') {
        await fetchSitesListData();

        if (sitesList.value.length > 0) {
          router.push({ name: 'accountMain' });

          await fetchPages();
        }
      }

      clearSubscriptionNotExistsError();
    }
  );

  onMounted(async () => {
    await fetchSitesListData();
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
  };
});
