import { notifyer } from 'account/src/instances/notifyer';
import { valuesDifference } from 'account/src/utility/values-difference/values-difference';
import { useForm } from 'vee-validate';
import { computed, ref, provide } from 'vue';
import { FORM_VALUES_PROVIDE_KEY, FROM_CURRENT_SITE_DATA_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { useSiteConfigurationStore } from '../../../stores/site-configuration-store.js';
import { CARD_TITLE } from '../constants.js';

export const useUpdateBasicSettingsForm = () => {
  const siteConfigurationStore = useSiteConfigurationStore();

  const { values, handleSubmit, resetForm, initialValues, meta } = useForm({
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

  provide(FORM_VALUES_PROVIDE_KEY, values);
  provide(FROM_CURRENT_SITE_DATA_KEY, siteConfigurationStore.currentSite);

  return {
    isDirty,
    handleSave,
    isSubmitLoading,
  };
};
