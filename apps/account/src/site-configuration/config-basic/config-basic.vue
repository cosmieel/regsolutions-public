<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-basic">
    <SettingsBasic />

    <SettingsImages />

    <SettingsStyle />

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
    </teleport>
  </section>
</template>

<script setup>
import { useNotConnectedDomainNotification } from 'account/src/utility/notifications/domain/use-not-connected-domain-notification';
import { UiError } from 'account-ui';
import { storeToRefs } from 'pinia';
import SettingsBasic from './settings-basic/settings-basic.vue';
import SettingsCustom from './settings-custom/settings-custom.vue';
import SettingsImages from './settings-images/settings-images.vue';
// import SettingsSecurity from './settings-security.vue';
import SettingsStyle from './settings-style/settings-style.vue';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const {
  currentSite,
  isLoading,
  isError,
  error,
  updateSiteDataErrorMessage,
  domainConfigurationError,
} = storeToRefs(siteConfigurationStore);

const closeUpdateSiteDataErrorMessage = () => {
  siteConfigurationStore.clearUpdateSiteDataError();
};

useNotConnectedDomainNotification(domainConfigurationError);
</script>

<style lang="postcss" scoped>
.config-basic {
  @apply space-y-6;
}
</style>
