import { notifyer } from 'account/src/instances/notifyer';
import { valuesDifference } from 'account/src/utility/values-difference/values-difference';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { useSiteConfigurationStore } from '../../../stores/site-configuration-store.js';
import { CARD_TITLE } from '../constants.js';

export const useUpdateCustomSettingsForm = () => {
  const siteConfigurationStore = useSiteConfigurationStore();

  const { handleSubmit, resetForm, initialValues, meta } = useForm({
    initialValues: getInitialValues(siteConfigurationStore.currentSite),
    validationSchema,
  });

  const isSubmitLoading = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const handleSave = () =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      try {
        const requestData = valuesDifference(values, initialValues);

        await siteConfigurationStore.updateSiteData(requestData);

        notifyer.success({
          message: `"${CARD_TITLE}" - данные успешно сохранены`,
        });

        resetForm({ values });
      } finally {
        isSubmitLoading.value = false;
      }
    })();

  return {
    isDirty,
    handleSave,
    isSubmitLoading,
  };
};
