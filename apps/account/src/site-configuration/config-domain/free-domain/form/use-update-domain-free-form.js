import { useValidateDomainMutationNew } from 'account/src/components/composables/validate-domain-mutation';
import { notifyer } from 'account/src/instances/notifyer';
import { useSiteConfigurationStore } from 'account/src/site-configuration/stores/site-configuration-store';
import { useForm } from 'vee-validate';
import { computed, ref, provide } from 'vue';
import { FREE_DOMAIN_KEY, FREE_DOMAIN_STATE_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { RESTRICTED_DOMAIN } from '../../constants.js';
import { FREE_DOMAIN_TITLE } from '../constants.js';

export const useUpdateDomainFreeForm = () => {
  const siteConfigurationStore = useSiteConfigurationStore();

  const validateDomainMutation = useValidateDomainMutationNew();

  const { handleSubmit, resetForm, values, meta, setFieldError } = useForm({
    initialValues: getInitialValues({
      [FREE_DOMAIN_KEY]: siteConfigurationStore.currentSite.domainFree,
    }),
    validationSchema,
  });

  const isSubmitLoading = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const domainFreeConnected = computed(() => {
    return !!siteConfigurationStore.currentSite.domainFree;
  });

  const validateDomain = async (value) => {
    try {
      await validateDomainMutation.mutateAsync(value);
    } catch (error) {
      if (error.code === 'ValidationError') {
        setFieldError(FREE_DOMAIN_KEY, RESTRICTED_DOMAIN);
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
        domainFree: value,
      });

      siteConfigurationStore.updateDomainFree(value);

      notifyer.success({
        message: `${FREE_DOMAIN_TITLE} - успешно сохранён`,
      });

      resetForm({ values });
    } catch (error) {
      notifyer.error({
        message: error.message,
      });

      throw error;
    }
  };

  const handleSave = () =>
    handleSubmit(async (values) => {
      if (!isDirty.value) {
        return;
      }

      isSubmitLoading.value = true;

      try {
        const domainFreeValue = values[FREE_DOMAIN_KEY];

        await validateDomain(domainFreeValue);

        await formDataUpdateRequest(domainFreeValue);
      } finally {
        isSubmitLoading.value = false;
      }
    })();

  const stateData = {
    values,
    isDirty,
    isSubmitLoading,
    domainFreeConnected,
    handleSave,
  };

  provide(FREE_DOMAIN_STATE_KEY, stateData);

  return stateData;
};
