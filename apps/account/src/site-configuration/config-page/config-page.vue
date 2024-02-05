<template>
  <section v-if="isError">An error has occurred: {{ error }}</section>
  <section v-else-if="currentSite && currentPage" :key="currentPage.id" class="config-page">
    <SettingsBasic />

    <UiCard :title="'Настройки SEO'">
      <template #ui-card-button>
        <UiButton
          class="config-page__save"
          size="small"
          :disabled="needSaveButtonDisable || isSavePending"
          :pending="isSavePending"
          @click="updatePageData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <PageSettingsSeo v-model:pageKeywords="currentPage.keywords" />
      </template>
    </UiCard>

    <UiCard :title="'Изображения страницы'">
      <template #ui-card-button>
        <UiButton
          class="config-page__save"
          size="small"
          :disabled="needSaveButtonDisable || isSavePending"
          :pending="isSavePending"
          @click="updatePageData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <PageSettingsImages
          :page-data="currentPage"
          @upload-file="onFileUpload"
          @remove-file="onFileRemove"
        />
      </template>
    </UiCard>

    <SettingsCustom />
  </section>
</template>

<script setup>
import { UiButton, UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import PageSettingsImages from './page-settings-images.vue';
import PageSettingsSeo from './page-settings-seo.vue';
import SettingsBasic from './settings-basic/settings-basic.vue';
import SettingsCustom from './settings-custom/settings-custom.vue';
import { useUnsavedNotification } from '../../utility/notifications/unsaved/use-unsaved-notification.js';
import { usePageConfigurationStore } from '../stores/page-configuration-store.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const pageConfigurationStore = usePageConfigurationStore();
const { currentPage, pageDataToUpdate, isError, error, needShowSavingDataNotification } =
  storeToRefs(pageConfigurationStore);

const isSavePending = ref(false);

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite } = storeToRefs(siteConfigurationStore);

const needSaveButtonDisable = computed(() => {
  return Object.getOwnPropertyNames(pageDataToUpdate.value).length === 0;
});

async function updatePageData() {
  isSavePending.value = true;
  await pageConfigurationStore.updatePageData();
  isSavePending.value = false;
}

const onFileUpload = (file) => pageConfigurationStore.uploadRequest(file);
const onFileRemove = () => {
  currentPage.value.image = '';
};

useUnsavedNotification(needShowSavingDataNotification, updatePageData);
</script>

<style lang="postcss" scoped>
.config-page {
  @apply space-y-6;
}
</style>
