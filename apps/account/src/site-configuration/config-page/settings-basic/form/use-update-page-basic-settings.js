import { notifyer } from 'account/src/instances/notifyer';
import { valuesDifference } from 'account/src/utility/values-difference/values-difference';
import { useForm } from 'vee-validate';
import { computed, ref, provide } from 'vue';
import {
  FORM_VALUES_PROVIDE_KEY,
  FROM_CURRENT_PAGE_DATA_KEY,
  FROM_CURRENT_SITE_DATA_KEY,
} from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';
import { usePageConfigurationStore } from '../../../stores/page-configuration-store.js';
import { useSiteConfigurationStore } from '../../../stores/site-configuration-store.js';
import { CARD_TITLE } from '../constants.js';

export const useUpdatePageBasicSettings = () => {
  const siteConfigurationStore = useSiteConfigurationStore();
  const pageConfigurationStore = usePageConfigurationStore();

  const { values, handleSubmit, resetForm, initialValues, meta } = useForm({
    initialValues: getInitialValues(pageConfigurationStore.currentPage),
    validationSchema: validationSchema(pageConfigurationStore.currentPage.main),
  });

  const isSubmitLoading = ref(false);

  const isDirty = computed(() => meta.value.dirty);

  const handleSave = () =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      try {
        const requestData = valuesDifference(values, initialValues);

        await pageConfigurationStore.updateCurrentPageData(requestData);

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
  provide(FROM_CURRENT_PAGE_DATA_KEY, pageConfigurationStore.currentPage);

  return {
    isDirty,
    handleSave,
    isSubmitLoading,
  };
};
