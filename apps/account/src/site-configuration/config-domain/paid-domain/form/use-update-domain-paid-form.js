import { useValidateDomainMutationNew } from 'account/src/components/composables/validate-domain-mutation';
import { notifyer } from 'account/src/instances/notifyer';
import { useSiteConfigurationStore } from 'account/src/site-configuration/stores/site-configuration-store';
import { useForm } from 'vee-validate';
import { computed, ref, provide, onBeforeMount } from 'vue';
import { PAID_DOMAIN_KEY, PAID_DOMAIN_STATE_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { RESTRICTED_DOMAIN, UNREGISTERED_DOMAIN } from '../../constants.js';
import { PAID_DOMAIN_TITLE } from '../constants.js';

export const useUpdateDomainPaidForm = () => {
  const siteConfigurationStore = useSiteConfigurationStore();

  const validateDomainMutation = useValidateDomainMutationNew();

  const currentDomain = computed(() => siteConfigurationStore.currentSite.domain);

  const { handleSubmit, resetForm, values, meta, setFieldError } = useForm({
    initialValues: getInitialValues({
      [PAID_DOMAIN_KEY]: currentDomain.value,
    }),
    validationSchema,
  });

  const isSubmitLoading = ref(false);
  const isStatusLoading = ref(false);
  const isFetching = ref(false);
  const isDomainConfigured = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const hasDomain = computed(() => !!siteConfigurationStore.currentSite.domain);

  const validateDomain = async (value) => {
    try {
      await validateDomainMutation.mutateAsync(value);
    } catch (error) {
      if (error.code === 'ValidationError') {
        setFieldError(PAID_DOMAIN_KEY, RESTRICTED_DOMAIN);
      } else {
        notifyer.error({
          message: error.message,
        });
      }

      throw error;
    }
  };

  const lookupDomain = async (value) => {
    try {
      const data = await siteConfigurationStore.checkDomainConfiguration(value);

      isDomainConfigured.value = data || false;
    } catch (error) {
      if (error.code === 'ValidationError') {
        setFieldError(PAID_DOMAIN_KEY, UNREGISTERED_DOMAIN);
      } else {
        notifyer.error({
          message: error.message,
        });
      }

      throw error;
    }
  };

  const formDataUpdateRequest = async (value) => {
    try {
      await siteConfigurationStore.updateSiteData({
        domain: value,
      });

      siteConfigurationStore.updateDomainCustom(value);

      notifyer.success({
        message: `${PAID_DOMAIN_TITLE} - успешно сохранён`,
      });

      resetForm({ values });
    } catch (error) {
      notifyer.error({
        message: error.message,
      });

      throw error;
    }
  };

  const handleUpdateStatus = async () => {
    isStatusLoading.value = true;

    try {
      const domain = siteConfigurationStore.currentSite.domain;

      await lookupDomain(domain);
    } finally {
      isStatusLoading.value = false;
    }
  };

  const handleFetchStatus = async () => {
    const domain = siteConfigurationStore.currentSite.domain;

    if (domain) {
      isFetching.value = true;

      try {
        await lookupDomain(domain);
      } finally {
        isFetching.value = false;
      }
    }
  };

  const handleSave = () =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      try {
        const domainPaidValue = values[PAID_DOMAIN_KEY];

        if (domainPaidValue) {
          await validateDomain(domainPaidValue);

          await lookupDomain(domainPaidValue);
        }

        await formDataUpdateRequest(domainPaidValue);
      } finally {
        isSubmitLoading.value = false;
      }
    })();

  const handleEnterSubmit = () => {
    if (!isDirty.value) {
      return;
    }

    handleSave();
  };

  onBeforeMount(async () => {
    await handleFetchStatus();
  });

  const stateData = {
    values,
    isDirty,
    hasDomain,
    isFetching,
    isStatusLoading,
    isSubmitLoading,
    isDomainConfigured,
    handleSave,
    handleEnterSubmit,
    handleUpdateStatus,
  };

  provide(PAID_DOMAIN_STATE_KEY, stateData);

  return stateData;
};
