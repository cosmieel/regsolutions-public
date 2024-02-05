<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="create-catalog">
    <UiCard :title="'Новый каталог'">
      <template #ui-card-button>
        <UiButton
          class="create-catalog__save"
          size="small"
          :disabled="isSaveButtonDisabled || isSavePending"
          :pending="isSavePending"
          @click="createCatalog"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <CatalogInfo
          v-model:catalogData="currentCatalog"
          :catalog-data="currentCatalog"
          :catalog-name-error-message="catalogNameErrorMessage"
          @upload-file="onFileUpload"
          @remove-file="onFileRemove"
        />
      </template>
    </UiCard>
  </section>
</template>

<script setup>
import { UiButton, UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useUnsavedNotification } from '../../../utility/notifications/unsaved/use-unsaved-notification.js';
import { useCatalogConfigurationStore } from '../../stores/catalog-configuration-store.js';
import { useSiteConfigurationStore } from '../../stores/site-configuration-store.js';
import CatalogInfo from '../catalog-info/catalog-info.vue';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isLoading, isError, error } = storeToRefs(siteConfigurationStore);

const catalogConfigurationStore = useCatalogConfigurationStore();
const {
  currentCatalog,
  needCatalogSaveButtonDisable,
  catalogNameErrorMessage,
  needShowSavingDataNotification,
} = storeToRefs(catalogConfigurationStore);

const isSavePending = ref(false);

async function createCatalog() {
  isSavePending.value = true;
  await catalogConfigurationStore.createCatalogRequest();
  isSavePending.value = false;
}

const onFileUpload = (file) => catalogConfigurationStore.uploadRequest(file);

const onFileRemove = () => {
  currentCatalog.value.image = '';
};

const isSaveButtonDisabled = computed(() => {
  return needCatalogSaveButtonDisable.value || catalogNameErrorMessage.value.length > 0;
});

useUnsavedNotification(needShowSavingDataNotification, createCatalog);
</script>

<style lang="postcss" scoped>
.create-catalog {
  @apply space-y-6;

  &__tabs {
    @apply flex space-x-2 p-[3px] bg-gray-50 rounded-md;
  }

  &__tabs-item {
    @apply py-1 px-4 inline-flex items-center text-sm font-medium text-center text-gray-700 rounded transition;

    &:hover {
      @apply bg-gray-100;
    }

    &.active {
      @apply pointer-events-none;
    }
  }
}
</style>
