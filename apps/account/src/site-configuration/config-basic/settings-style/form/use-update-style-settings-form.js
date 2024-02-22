import { notifyer } from 'account/src/instances/notifyer';
import { useForm } from 'vee-validate';
import { computed, ref, provide } from 'vue';
import { FORM_VALUES_PROVIDE_KEY, COLOR_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { useSiteConfigurationStore } from '../../../stores/site-configuration-store.js';
import { CARD_TITLE } from '../constants.js';

export const useUpdateStyleSettingsForm = () => {
  const siteConfigurationStore = useSiteConfigurationStore();

  const { values, handleSubmit, resetForm, meta } = useForm({
    initialValues: getInitialValues(siteConfigurationStore.currentSite),
    validationSchema,
  });

  const isSubmitLoading = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const handleSave = () =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      try {
        await siteConfigurationStore.updateSiteData({
          color: values[COLOR_KEY],
        });

        notifyer.success({
          message: `"${CARD_TITLE}" - данные успешно сохранены`,
        });

        resetForm({ values });
      } finally {
        isSubmitLoading.value = false;
      }
    })();

  provide(FORM_VALUES_PROVIDE_KEY, values);

  return {
    isDirty,
    handleSave,
    isSubmitLoading,
  };
};
