import { useQueryClient } from '@tanstack/vue-query';
import isEqual from 'lodash.isequal';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { moveArrayItem } from './helpers.js';
import { useAuthFormStore } from '../../auth/stores/auth-form.js';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { useUserSitesStore } from '../../user-sites/stores/user-sites-store.js';
import { useLookupDomainMutationNew } from '../composables/lookup-domain-mutation.js';
import { getAllPages, usePagesQuery } from '../composables/pages-query.js';
import { getSiteById, useSiteQuery } from '../composables/site-query.js';

const initCheckoutField = (targetObject) => {
  if (!targetObject.checkout) {
    targetObject.checkout = {
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
          type: 'phone',
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
    };
  }
};

export const useSiteConfigurationStore = defineStore('siteConfigurationStore', () => {
  const queryClient = useQueryClient();
  const route = useRoute();
  const userSitesStore = useUserSitesStore();
  const uploadMutation = useUploadMutation();
  const lookupDomainMutation = useLookupDomainMutationNew();

  const userAccountStore = useUserAccountStore();
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const authStore = useAuthFormStore();

  const queryCache = queryClient.getQueryCache();

  const currentSite = ref('');
  const siteId = computed(() => route.params.siteId);
  const siteDataToUpdate = ref({});

  const updateSiteDataErrorMessage = ref('');
  const updateOrderEmailErrorMessage = ref('');
  const needShowSavingDataNotification = ref(false);
  const domainConfigurationError = ref(null);

  const currentCheckout = computed(() => {
    return currentSite.value?.checkout;
  });

  const isNeedSaveButtonDisabled = computed(() => {
    return Object.getOwnPropertyNames(siteDataToUpdate.value).length === 0;
  });

  const currentPagesList = ref([]);

  const logout = async () => await authStore.logoutRequest();

  const { isLoading, isError, isSuccess, data: site, error } = useSiteQuery(siteId.value);
  const pagesQuery = usePagesQuery(siteId.value);

  async function retrieveSiteDataRequest(siteId) {
    return await queryClient.fetchQuery({
      queryKey: ['site', siteId],
      queryFn: async () => await getSiteById(siteId),
    });
  }

  async function updateUnPublishedChangesCounter() {
    if (currentSite.value) {
      const response = await retrieveSiteDataRequest(currentSite.value.id);

      if (response && currentSite.value.changes !== undefined) {
        currentSite.value.changes = response.changes;
      }
    }
  }

  async function fetchSiteData(siteId) {
    try {
      const dataFromCache = queryCache.queriesMap[`["site","${siteId}"]`]?.state?.data;

      // eslint-disable-next-line unicorn/prefer-ternary
      if (dataFromCache) {
        currentSite.value = dataFromCache;
      } else {
        const response = await retrieveSiteDataRequest(siteId);

        if (response) {
          currentSite.value = response;
        }
      }

      initCheckoutField(currentSite.value);

      await checkDomainConfiguration(currentSite.value.domain, currentSite.value.domainFree);
    } catch (error) {
      if (error.message === 'error_no_access') {
        await logout();
      }

      console.log(error);
    }
  }

  function addCheckoutField(newField) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.fields.push(newField);
  }

  function deleteCheckoutField(fieldIndex) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.fields.splice(fieldIndex, 1);
  }

  function updateCheckoutField(newField, fieldIndex) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.fields[fieldIndex] = newField;
  }

  function moveCheckoutField(fromIndex, toIndex) {
    initCheckoutField(currentSite.value);
    moveArrayItem(currentSite.value.checkout.fields, fromIndex, toIndex);
  }

  function renameCheckoutField(itemIndex, newName) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.fields[itemIndex].label = newName;
  }

  function toggleRequiredCheckoutField(itemIndex) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.fields[itemIndex].required =
      !currentSite.value.checkout.fields[itemIndex].required;
  }

  function setButtonLabel(label) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.button.text = label;
  }

  function addTerms() {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.terms = {
      rulesLink: '',
      policyLink: '',
    };
  }

  function setTerms(terms) {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.terms = terms;
  }

  function deleteTerms() {
    initCheckoutField(currentSite.value);
    currentSite.value.checkout.terms = null;
  }

  async function fetchPages(siteId) {
    try {
      const pagesList = await queryClient.fetchQuery({
        queryKey: ['pages'],
        queryFn: async () => await getAllPages(siteId),
      });

      currentPagesList.value = pagesList.sort((a, b) => {
        return b.main - a.main || a.id - b.id;
      });
    } catch (error) {
      console.log(error);
    }
  }

  watch(
    () => route.params.siteId,
    async (currentSiteId) => {
      if (currentSiteId) {
        await fetchSiteData(currentSiteId);
        currentSite.value.language = currentSite.value.language || 'ru';

        await fetchPages(currentSiteId);

        siteDataToUpdate.value = {};
      }
    },
    {
      immediate: true,
    }
  );

  watch(isSuccess, async (value) => {
    if (value) {
      await fetchPages(siteId.value);
    }
  });

  watch(
    currentPagesList,
    async (currentPagesListData) => {
      if (siteId.value) {
        queryClient.setQueryData(['pages'], currentPagesListData);
      }
    },
    { deep: true }
  );

  const clonedSiteData = computed(() => JSON.parse(JSON.stringify(currentSite.value)));
  const setDataForUpdateRequest = (siteProps, oldSiteProps) => {
    const sitePropsEntries = Object.entries(siteProps);

    sitePropsEntries.map(([key, value]) => {
      if (typeof value !== 'object' && oldSiteProps[key] !== value) {
        siteDataToUpdate.value[key] = value;
      }

      if (typeof value === 'object') {
        for (const property in value) {
          if (!isEqual(oldSiteProps[key]?.[property], value[property])) {
            siteDataToUpdate.value[key] = {
              [property]: value[property],
              ...value,
            };
          }
        }
      }
    });
  };

  watch(
    clonedSiteData,
    (siteProps, oldSiteProps) => {
      setDataForUpdateRequest(siteProps, oldSiteProps);
    },
    { deep: true }
  );

  watch(
    siteDataToUpdate,
    (value) => {
      needShowSavingDataNotification.value = Object.getOwnPropertyNames(value).length;
    },
    { deep: true }
  );

  async function updateSiteData(data) {
    // if (siteDataToUpdate.value.header) {
    //   delete siteDataToUpdate.value.header;
    // }

    // if (siteDataToUpdate.value.footer) {
    //   delete siteDataToUpdate.value.footer;
    // }

    await userSitesStore.updateSiteRequest({
      id: currentSite.value.id,
      ...(data || siteDataToUpdate.value),
    });

    // TODO Временно, до полного перехода на VeeValidate
    if (data) {
      currentSite.value = { ...currentSite.value, ...data };
    }

    siteDataToUpdate.value = {};
  }

  async function uploadRequest(property, file) {
    try {
      const data = await uploadMutation.mutateAsync({ file });

      if (uploadMutation.isSuccess.value) {
        currentSite.value[property] = data.url;
      }
    } catch {
      console.log('');
    }
  }

  async function publishSite() {
    await userSitesStore.publishSiteRequest(route.params.siteId);
    currentSite.value.changes = 0;

    queryClient.clear();
  }

  async function unpublishSite() {
    const newSiteData = await userSitesStore.unpublishSiteRequest(route.params.siteId);

    currentSite.value.published = newSiteData.published;

    queryClient.clear();
  }

  async function checkDomainConfiguration(domain, domainFree) {
    clearDomainConfigurationError();

    const hasAnyDomain = domain || domainFree;

    if (hasAnyDomain) {
      if (domain) {
        const data = await lookupDomainMutation.mutateAsync(domain);

        if (data.result) {
          return data.result;
        } else {
          domainConfigurationError.value = 'Платный домен указан, но не подключен';
        }
      }
    } else {
      domainConfigurationError.value = 'Нет подключенного домена';
    }
  }

  function clearUpdateSiteDataError() {
    updateSiteDataErrorMessage.value = '';
  }

  function clearUpdateOrderEmailError() {
    updateOrderEmailErrorMessage.value = '';
  }

  function clearDomainConfigurationError() {
    domainConfigurationError.value = null;
  }

  function clearSavingDataNotification() {
    needShowSavingDataNotification.value = false;
  }

  function handleClearCurrentPagesList() {
    currentPagesList.value = [];
  }

  function updateDomainFree(value) {
    const dataFromCache = queryCache.queriesMap[`["site","${currentSite.value.id}"]`]?.state?.data;

    if (dataFromCache) {
      dataFromCache.domainFree = value;
    }

    currentSite.value.domainFree = value;
  }

  function updateDomainCustom(value) {
    const dataFromCache = queryCache.queriesMap[`["site","${currentSite.value.id}"]`]?.state?.data;

    if (dataFromCache) {
      dataFromCache.domain = value;
    }

    currentSite.value.domain = value;
  }

  return {
    currentSite,
    currentCheckout,
    currentPagesList,
    pagesQuery,
    siteId,
    fetchSiteData,
    fetchPages,
    site,
    isLoading,
    isSuccess,
    isError,
    error,
    siteDataToUpdate,
    isNeedSaveButtonDisabled,
    updateSiteDataErrorMessage,
    updateSiteData,
    uploadRequest,
    publishSite,
    unpublishSite,
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
    handleClearCurrentPagesList,
    clearUpdateSiteDataError,
    clearSavingDataNotification,
    needShowSavingDataNotification,
    domainConfigurationError,
    clearDomainConfigurationError,
    updateOrderEmailErrorMessage,
    clearUpdateOrderEmailError,
    currentImagesStorage,
    updateUnPublishedChangesCounter,
    updateDomainCustom,
    updateDomainFree,
    checkDomainConfiguration,
  };
});
