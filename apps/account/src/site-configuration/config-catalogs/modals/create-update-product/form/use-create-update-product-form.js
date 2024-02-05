import { modalManager } from 'account/src/instances/modal-manager.js';
import { notifyer } from 'account/src/instances/notifyer.js';
import { useValuesDifference } from 'account/src/utility/values-difference/use-values-difference.js';
import { useForm } from 'vee-validate';
import { computed, provide, ref, useAttrs } from 'vue';
import { useRoute } from 'vue-router';
import {
  CATALOG_LIST_OPTIONS_KEY,
  CURRENT_CATALOG_KEY,
  FORM_VALUES_PROVIDE_KEY,
  MEDIA_UPLOAD_KEY,
  MEDIA_UPLOAD_LOADING_KEY,
  PRODUCT_PROVIDE_KEY,
} from './constants.js';
import { getInitialValues, convertDataForRequest } from './data.js';
import { validationSchema } from './validation-schema.js';
import { useCatalogConfigurationStore } from '../../../../stores/catalog-configuration-store.js';
import { useCatalogItemsConfigurationStore } from '../../../../stores/catalog-items-configuration-store.js';

export const useCreateUpdateProductForm = () => {
  const catalogItemsConfigurationStore = useCatalogItemsConfigurationStore();
  const catalogConfigurationStore = useCatalogConfigurationStore();

  const attributes = useAttrs();

  const modalProps = attributes?.modalProps;

  const product = modalProps?.product;
  const catalogId = modalProps?.catalogId;

  const { values, errors, handleSubmit, resetForm, initialValues, meta } = useForm({
    initialValues: getInitialValues(catalogId, product),
    validationSchema,
  });

  const changedValues = useValuesDifference(values, initialValues);

  const route = useRoute();

  const id = ref(product?.id || null);
  const isEditing = ref(!!product);
  const isSubmitLoading = ref(false);
  const isMediaLoading = ref(false);

  const catalogsList = computed(() =>
    (modalProps?.catalogsList || []).map((catalog) => {
      return {
        name: catalog.name,
        value: Number(catalog.id),
      };
    })
  );

  const isDirty = computed(() => meta.value.dirty);
  const currentCatalog = computed(() => catalogConfigurationStore.currentCatalog);

  const imagesUploader = async (image) => {
    isMediaLoading.value = true;

    try {
      const response = await catalogItemsConfigurationStore.uploadRequest(image);

      return response?.url || null;
    } finally {
      isMediaLoading.value = false;
    }
  };

  const handleSave = (withClose) =>
    handleSubmit(async (values) => {
      isSubmitLoading.value = true;

      const isEqualsInitial = values.catalogId === initialValues.value.catalogId;

      try {
        if (isEditing.value) {
          await catalogItemsConfigurationStore.updateCatalogItemRequest(
            {
              id: id.value,
              ...convertDataForRequest(changedValues.value),
            },
            isEqualsInitial
          );

          notifyer.success({
            message: 'Товар успешно сохранён',
          });
        } else {
          const response = await catalogItemsConfigurationStore.createCatalogItemRequest(
            {
              ...convertDataForRequest(values),
              siteId: route.params.siteId,
            },
            isEqualsInitial
          );

          if (response?.id) {
            id.value = response.id;

            isEditing.value = true;

            notifyer.success({
              message: 'Товар успешно создан',
            });
          }
        }

        resetForm({ values: values });

        if (withClose) {
          modalManager.close();
        }
      } finally {
        isSubmitLoading.value = false;
      }
    })();

  const handleSaveAndClose = () => handleSave(true);

  provide(FORM_VALUES_PROVIDE_KEY, values);
  provide(PRODUCT_PROVIDE_KEY, product);
  provide(CATALOG_LIST_OPTIONS_KEY, catalogsList);
  provide(MEDIA_UPLOAD_KEY, imagesUploader);
  provide(MEDIA_UPLOAD_LOADING_KEY, isMediaLoading);
  provide(CURRENT_CATALOG_KEY, currentCatalog);

  return {
    values,
    errors,
    isEditing,
    isSubmitLoading,
    catalogsList,
    changedValues,
    isMediaLoading,
    isDirty,
    handleSave,
    handleSaveAndClose,
  };
};
