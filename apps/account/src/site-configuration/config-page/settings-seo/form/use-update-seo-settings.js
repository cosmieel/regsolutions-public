import { notifyer } from 'account/src/instances/notifyer';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { getInitialValues, convertDataForRequest } from './data.js';
import { validationSchema } from './validation-schema.js';
import { usePageConfigurationStore } from '../../../stores/page-configuration-store.js';
import { CARD_TITLE } from '../constants.js';

export const useUpdateSeoSettings = () => {
  const pageConfigurationStore = usePageConfigurationStore();

  const { handleSubmit, resetForm, meta } = useForm({
    initialValues: getInitialValues(pageConfigurationStore.currentPage),
    validationSchema,
  });

  const isSubmitLoading = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const handleSave = () =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      try {
        await pageConfigurationStore.updateCurrentPageData(convertDataForRequest(values));

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
