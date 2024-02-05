import { useQueryClient } from '@tanstack/vue-query';
import { defineStore, storeToRefs } from 'pinia';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useValidateDomainMutation } from '../../components/composables/validate-domain-mutation.js';
import { useUserSitesStore } from '../../user-sites/stores/user-sites-store.js';
import { useLookupDomainMutation } from '../composables/lookup-domain-mutation.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

export const useDomainConfigurationStore = defineStore('domainConfigurationStore', () => {
  const queryClient = useQueryClient();
  const route = useRoute();

  const userSitesStore = useUserSitesStore();

  const siteConfigurationStore = useSiteConfigurationStore();
  const { currentSite } = storeToRefs(siteConfigurationStore);

  const lookupDomainMutation = useLookupDomainMutation();
  const validateDomainMutation = useValidateDomainMutation();

  const freeDomainProps = reactive({
    freeDomain: '',
    isFreeDomainValid: true,
    isFreeDomainConfigured: true,
  });
  const freeDomain = ref('');
  const freeDomainErrorMessage = ref('');
  const isFreeDomainValid = ref(true);
  const isFreeDomainConfigured = ref(true);

  const paidDomainProps = reactive({
    paidDomain: '',
    isPaidDomainValid: false,
    isPaidDomainConfigured: false,
  });

  const domainInitial = ref('');
  const paidDomain = ref('');
  const paidDomainErrorMessage = ref('');
  const isPaidDomainValid = ref(false);
  const isPaidDomainConfigured = ref(false);

  const ERROR_DUPLICATE = 'Домен уже занят. Попробуйте другой домен';
  const ERROR_VALIDATION = 'Домен не зарегестрирован. Проверьте написание и попробуйте еще раз';

  watch(
    currentSite,
    (value) => {
      getDomainsDataFromStorage(value.id);
    },
    { deep: true }
  );

  watch(freeDomainProps, (value) => {
    localStorage.setItem(`freeDomainProps_${route.params.siteId}`, JSON.stringify(value));
  });

  watch(freeDomain, (value) => {
    freeDomainProps.freeDomain = value;
    nextTick(() => {
      freeDomain.value = value.toLowerCase().replaceAll(/[^\d.a-zа-я-]/g, '');
    });
    freeDomainErrorMessage.value = '';
  });

  watch(isFreeDomainValid, (value) => {
    freeDomainProps.isFreeDomainValid = value;
  });

  watch(isFreeDomainConfigured, (value) => {
    freeDomainProps.isFreeDomainConfigured = value;
  });

  watch(paidDomainProps, (value) => {
    localStorage.setItem(`paidDomainProps_${route.params.siteId}`, JSON.stringify(value));
  });

  watch(paidDomain, (value) => {
    paidDomainProps.paidDomain = value;
    nextTick(() => {
      paidDomain.value = value.toLowerCase().replaceAll(/[^\d.a-zа-я-]/g, '');
    });
    paidDomainErrorMessage.value = '';
  });

  watch(isPaidDomainValid, (value) => {
    paidDomainProps.isPaidDomainValid = value;
  });

  watch(isPaidDomainConfigured, (value) => {
    paidDomainProps.isPaidDomainConfigured = value;
  });

  watch(
    () => route.params.siteId,
    async (currentSiteId) => {
      if (route.name !== 'siteConfigurationDomain') {
        return;
      }

      await prepareDomainsData(currentSiteId);
    },
    {
      deep: true,
      immediate: true,
    }
  );

  onMounted(async () => {
    await prepareDomainsData(route.params.siteId);
  });

  async function prepareDomainsData(currentSiteId) {
    if (currentSiteId) {
      getDomainsDataFromStorage(currentSiteId);

      if (paidDomain.value && !freeDomain.value) {
        await lookupPaidDomain();
      }
    }
  }

  function getDomainsDataFromStorage(currentSiteId) {
    const getFreeDomainProps = localStorage.getItem(`freeDomainProps_${currentSiteId}`);
    const getPaidDomainProps = localStorage.getItem(`paidDomainProps_${currentSiteId}`);

    const storedFreeDomainProps = JSON.parse(getFreeDomainProps);
    const storedPaidDomainProps = JSON.parse(getPaidDomainProps);

    freeDomain.value = '';
    isFreeDomainValid.value = false;
    isFreeDomainConfigured.value = false;
    paidDomain.value = '';
    isPaidDomainValid.value = false;
    isPaidDomainConfigured.value = false;
    domainInitial.value = '';

    if (getFreeDomainProps) {
      Object.keys(freeDomainProps).map(
        (item) => (freeDomainProps[item] = storedFreeDomainProps[item])
      );

      isFreeDomainValid.value = String(storedFreeDomainProps.isFreeDomainValid)
        ? storedFreeDomainProps.isFreeDomainValid
        : false;
      isFreeDomainConfigured.value = String(storedFreeDomainProps.isFreeDomainConfigured)
        ? storedFreeDomainProps.isFreeDomainConfigured
        : false;
    }

    if (getPaidDomainProps) {
      Object.keys(paidDomainProps).map(
        (item) => (paidDomainProps[item] = storedPaidDomainProps[item])
      );

      isPaidDomainValid.value = String(storedPaidDomainProps.isPaidDomainValid)
        ? storedPaidDomainProps.isPaidDomainValid
        : false;
      isPaidDomainConfigured.value = String(storedPaidDomainProps.isPaidDomainConfigured)
        ? storedPaidDomainProps.isPaidDomainConfigured
        : false;
    }

    const currentDomain = currentSite.value?.domain;

    if (currentDomain?.toLowerCase().indexOf('.regsolutions.site') >= 0) {
      freeDomain.value = currentDomain?.split('.')[0] || storedFreeDomainProps?.freeDomain;
      isFreeDomainConfigured.value = true;
      paidDomain.value = '';
      isPaidDomainValid.value = false;
      isPaidDomainConfigured.value = false;
    } else {
      paidDomain.value = currentDomain || storedPaidDomainProps?.paidDomain;
      domainInitial.value = paidDomain.value;
      freeDomain.value = '';
      isFreeDomainValid.value = false;
      isFreeDomainConfigured.value = false;
    }
  }

  async function validateFreeDomainRequest() {
    try {
      await validateDomainMutation.mutateAsync({ domain: `${freeDomain.value}.regsolutions.site` });
      freeDomainErrorMessage.value = '';
      isFreeDomainValid.value = true;
    } catch (error) {
      if (error.message === 'ValidationError') {
        isFreeDomainValid.value = false;
        freeDomainErrorMessage.value = ERROR_DUPLICATE;

        return validateDomainMutation.isSuccess.value;
      }

      freeDomainErrorMessage.value = error.message;
    }

    return isFreeDomainValid.value;
  }

  async function updateFreeDomain() {
    const currentSiteDomain = currentSite?.value?.domain?.split('.')[0];

    if (currentSiteDomain === freeDomain.value) {
      isFreeDomainValid.value = true;

      return;
    }

    const isDomainValid = await validateFreeDomainRequest();

    if (isDomainValid) {
      currentSite.value = await updateSiteData(`${freeDomain.value}.regsolutions.site`);
    }

    isFreeDomainConfigured.value = true;
  }

  async function validatePaidDomainRequest() {
    if (currentSite.value.domain === paidDomain.value) {
      return;
    }

    try {
      await validateDomainMutation.mutateAsync({ domain: paidDomain.value });
      paidDomainErrorMessage.value = '';
    } catch (error) {
      if (error.message === 'ValidationError') {
        isPaidDomainValid.value = false;

        paidDomainErrorMessage.value = ERROR_DUPLICATE;

        return validateDomainMutation.isSuccess.value;
      }

      paidDomainErrorMessage.value = error.message;
    }

    return validateDomainMutation.isSuccess.value;
  }

  async function lookupPaidDomainRequest() {
    if (currentSite.value.domain === paidDomain.value) {
      isPaidDomainValid.value = true;
      isPaidDomainConfigured.value = true;

      return;
    }

    const isDomainValid = await validatePaidDomainRequest();

    if (!isDomainValid) {
      return;
    }

    const data = await lookupPaidDomain();

    if (data) {
      freeDomain.value = '';

      currentSite.value = await updateSiteData(paidDomain.value);
    }
  }

  async function lookupPaidDomain() {
    try {
      const data = await lookupDomainMutation.mutateAsync({ domain: paidDomain.value });

      if (lookupDomainMutation.isSuccess.value) {
        paidDomainErrorMessage.value = '';
        isPaidDomainValid.value = true;
        isPaidDomainConfigured.value = data.result;
        domainInitial.value = paidDomain.value;
      }
    } catch (error) {
      if (error.message === 'ValidationError') {
        paidDomainErrorMessage.value = ERROR_VALIDATION;
        isPaidDomainValid.value = false;

        return;
      }

      paidDomainErrorMessage.value = error.message;
    }

    return isPaidDomainConfigured.value;
  }

  async function updateSiteData(currentDomain) {
    try {
      const newSiteData = await userSitesStore.updateSiteRequest({
        id: currentSite.value.id,
        domain: currentDomain,
      });

      queryClient.clear();

      return newSiteData;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    freeDomain,
    domainInitial,
    isFreeDomainValid,
    isFreeDomainConfigured,
    freeDomainErrorMessage,
    paidDomain,
    paidDomainErrorMessage,
    isPaidDomainValid,
    isPaidDomainConfigured,
    lookupPaidDomainRequest,
    validatePaidDomainRequest,
    validateFreeDomainRequest,
    updateFreeDomain,
  };
});
