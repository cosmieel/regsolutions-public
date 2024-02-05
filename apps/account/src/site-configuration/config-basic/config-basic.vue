<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-basic">
    <SettingsBasic />

    <UiCard :title="'Изображения сайта'">
      <template #ui-card-button>
        <UiButton
          class="config-basic__save"
          size="small"
          :disabled="needSaveButtonDisable || isSavePending"
          :pending="isSavePending"
          @click="updateSiteData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <SettingsImages
          :site-data="currentSite"
          @upload-file="onFileUpload"
          @remove-file="onFileRemove"
        />
      </template>
    </UiCard>

    <UiCard :title="'Стиль сайта'">
      <template #ui-card-button>
        <UiButton
          class="config-basic__save"
          size="small"
          :disabled="needSaveButtonDisable || isSavePending"
          :pending="isSavePending"
          @click="updateSiteData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <SettingsStyle :site-data="currentSite" @select-color="onColorSelect" />
      </template>
    </UiCard>

    <!-- <UiCard
      :title="'Безопасность'"
      :description="'Ваш сайт будут видеть только те, у кого есть к нему пароль'"
    >
      <template #ui-card-button>
        <UiButton
          class="config-basic__save"
          size="small"
          :disabled="needSaveButtonDisable"
          @click="updateSiteData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <SettingsSecurity v-model:siteData="currentSite" />
      </template>
    </UiCard> -->

    <SettingsCustom />

    <teleport to="#user-account-alerts-wrapper">
      <UiError
        v-if="updateSiteDataErrorMessage"
        :error-text="updateSiteDataErrorMessage"
        notify-without-controls
        @close="closeUpdateSiteDataErrorMessage"
      />

      <UiError
        v-if="isDomainConfigurationError"
        :error-text="'Нет подключенного домена'"
        @close="closeDomainConfigurationErrorMessage"
      >
        <router-link :to="{ name: 'siteConfigurationDomain' }">
          <UiButton is-ghost-white>Настроить</UiButton>
        </router-link>
      </UiError>
    </teleport>
  </section>
</template>

<script setup>
import { UiButton, UiCard, UiError } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import SettingsBasic from './settings-basic/settings-basic.vue';
import SettingsCustom from './settings-custom/settings-custom.vue';
import SettingsImages from './settings-images.vue';
// import SettingsSecurity from './settings-security.vue';
import SettingsStyle from './settings-style.vue';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const {
  siteDataToUpdate,
  currentSite,
  isLoading,
  isError,
  error,
  updateSiteDataErrorMessage,
  isDomainConfigurationError,
} = storeToRefs(siteConfigurationStore);

const isSavePending = ref(false);

const needSaveButtonDisable = computed(() => {
  return Object.getOwnPropertyNames(siteDataToUpdate.value).length === 0;
});

async function updateSiteData() {
  isSavePending.value = true;
  await siteConfigurationStore.updateSiteData();
  isSavePending.value = false;
}

const onColorSelect = (hex) => {
  currentSite.value.color = hex;
};

const onFileUpload = (property, file) => siteConfigurationStore.uploadRequest(property, file);

const closeUpdateSiteDataErrorMessage = () => {
  siteConfigurationStore.clearUpdateSiteDataError();
};

const closeDomainConfigurationErrorMessage = () => {
  siteConfigurationStore.clearDomainConfigurationError();
};

const onFileRemove = (property) => {
  currentSite.value[property] = '';
};
</script>

<style lang="postcss" scoped>
.config-basic {
  @apply space-y-6;
}
</style>
