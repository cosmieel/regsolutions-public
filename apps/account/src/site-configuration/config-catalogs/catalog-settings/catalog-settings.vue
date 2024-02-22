<template>
  <section v-if="isCatalogFetching">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="isCatalogError">Произошла ошибка: {{ catalogError }}</section>
  <section v-else-if="currentSite && currentCatalog" class="catalog-settings">
    <UiCard :title="'Настройка каталога'" :description="currentCatalog.name">
      <template #ui-card-button>
        <UiButton
          class="catalog-settings__save"
          size="small"
          :disabled="isSaveButtonDisabled || isSavePending"
          :pending="isSavePending"
          @click="updateCatalogData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <CatalogInfo
          v-if="currentCatalog"
          v-model:catalogData="currentCatalog"
          :catalog-data="currentCatalog"
          :catalog-name-error-message="catalogNameErrorMessage"
          @upload-file="onFileUpload"
          @remove-file="onFileRemove"
        />

        <div class="catalog-settings__delete">
          <UiButton is-outline @click="callDeleteCatalogModal(deleteCatalog)">
            Удалить каталог
          </UiButton>
        </div>
      </template>
    </UiCard>

    <UiCard
      v-if="currentCatalogItemsFilteredList.length > 0"
      :title="'Товары в каталоге'"
      :description="'Добавьте вручную или загрузите файл со списком товаров/услуг на свой сайт'"
    >
      <template #ui-card-button>
        <AddProductManually :button-text="buttonText" @add="handelOpenCreateProductModal" />
      </template>
      <template #default>
        <ProductTable
          :catalog-items-list="currentCatalogItemsFilteredList"
          :currency="currentCatalog.currency"
          :unit="currentCatalog.unit"
          :catalogs-list="currentCatalogsList"
          :catalog="currentCatalog"
          @delete-catalog-item="onDeleteCatalogItem"
          @duplicate-catalog-item="onDuplicateCatalogItem"
          @update-active-state="onUpdateActiveState"
          @update-order="onUpdateOrder"
        />
      </template>
    </UiCard>

    <UiCard
      v-if="currentCatalogItemsFilteredList.length === 0"
      :need-controls="false"
      :need-header="false"
      :need-divider="false"
    >
      <template #default>
        <EmptyProductsManually @add="handelOpenCreateProductModal" />
      </template>
    </UiCard>
  </section>
</template>

<script setup>
import { notifyer } from 'account/src/instances/notifyer';
import { UiButton, UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddProductManually from './add-product-manually.vue';
import ProductTable from './product-table.vue';
import { useUnsavedNotification } from '../../../utility/notifications/unsaved/use-unsaved-notification.js';
import { useCatalogConfigurationStore } from '../../stores/catalog-configuration-store.js';
import { useCatalogItemsConfigurationStore } from '../../stores/catalog-items-configuration-store.js';
import { useSiteConfigurationStore } from '../../stores/site-configuration-store.js';
import CatalogInfo from '../catalog-info/catalog-info.vue';
import EmptyProductsManually from '../create-catalog/empty-products-manually.vue';
import { callOpenCreateUpdateModal } from '../modals/create-update-product/create-update-product.js';
import { callDeleteCatalogModal } from '../modals/delete-catalog-modal.js';

const router = useRouter();

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isError, error } = storeToRefs(siteConfigurationStore);

const catalogConfigurationStore = useCatalogConfigurationStore();
const {
  currentCatalogsList,
  currentCatalog,
  isCatalogError,
  catalogError,
  needCatalogSaveButtonDisable,
  isCatalogFetching,
  catalogNameErrorMessage,
  needShowSavingDataNotification,
} = storeToRefs(catalogConfigurationStore);

const catalogItemsConfigurationStore = useCatalogItemsConfigurationStore();
const { currentCatalogItemsFilteredList, deletedItems } = storeToRefs(
  catalogItemsConfigurationStore
);

const isSavePending = ref(false);

async function updateCatalogData() {
  isSavePending.value = true;
  await catalogConfigurationStore.updateCatalogData();
  isSavePending.value = false;
}

async function deleteCatalog() {
  await catalogConfigurationStore.deleteCatalogByIds([currentCatalog.value.id]);

  notifyer.success({
    message: 'Каталог успешно удалён',
  });

  await router.push({ name: 'siteConfigurationCatalogs' });
}

const handelOpenCreateProductModal = () => {
  callOpenCreateUpdateModal({
    catalogId: currentCatalog.value.id,
    catalogsList: currentCatalogsList,
  });
};

const onFileUpload = (file) => catalogConfigurationStore.uploadRequest(file);

const onFileRemove = () => {
  currentCatalog.value.image = '';
};

const onDeleteCatalogItem = async (catalogItemId) => {
  await catalogItemsConfigurationStore.deleteCatalogItem(catalogItemId);
};

const onDuplicateCatalogItem = async (catalogItemId) => {
  await catalogItemsConfigurationStore.duplicateCatalogItemRequest(catalogItemId);
};

const onUpdateActiveState = async (active, id) => {
  await catalogItemsConfigurationStore.updateActiveState(id, active);
};

const onUpdateOrder = async () => {
  await catalogItemsConfigurationStore.batchUpdateCatalogItemsRequest();
};

const isSaveButtonDisabled = computed(() => {
  return needCatalogSaveButtonDisable.value || catalogNameErrorMessage.value.length > 0;
});

useUnsavedNotification(needShowSavingDataNotification, updateCatalogData);

onMounted(async () => {
  if (deletedItems.value.length > 0) {
    for (const item of deletedItems.value) {
      await catalogItemsConfigurationStore.deleteCatalogItemRequest(item);
    }
  }
});

const buttonText = computed(() => {
  return currentCatalogItemsFilteredList.value.length > 0 ? 'Добавить' : 'Добавить товар';
});
</script>

<style lang="postcss" scoped>
.catalog-settings {
  @apply space-y-6;

  &__delete {
    @apply pt-6;

    .ui-button_outline {
      @apply text-red-500;
    }
  }
}
</style>
