<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-cart">
    <ConfigEmail />

    <UiCard
      :title="'Форма в корзине'"
      :description="'Пользователи вашего сайта будут заполнять эту форму перед оплатой всех товаров в корзине '"
      :need-divider="false"
    >
      <template #ui-card-button>
        <UiButton
          class="catalog-settings__save"
          size="small"
          :disabled="isNeedSaveButtonDisabled || isSavePending"
          :pending="isSavePending"
          @click="updateSiteData"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <CatalogForm :store-type="'site'" />
      </template>
    </UiCard>

    <teleport to="#user-account-alerts-wrapper">
      <UiError
        v-if="updateSiteDataErrorMessage"
        :error-text="'Неизвестная ошибка'"
        notify-without-controls
        @close="closeUpdateSiteDataErrorMessage"
      />
      <UiError
        v-if="updateOrderEmailErrorMessage"
        :error-text="'Такой почты не существует'"
        :error-description="'Проверьте написание и попробуйте еще раз'"
        notify-without-controls
        @close="closeUpdateOrderEmailErrorMessage"
      />
    </teleport>
  </section>
</template>

<script setup>
import { UiButton, UiCard, UiError } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ConfigEmail from './config-email/config-email.vue';
import CatalogForm from '../../components/order-form/order-form.vue';
// TODO Hidden by this ticket - https://jira.runity.ru/browse/REGSOLUT-586
// import { useUnsavedNotification } from '../../utility/notifications/unsaved/use-unsaved-notification.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const {
  currentSite,
  isLoading,
  isError,
  error,
  isNeedSaveButtonDisabled,
  updateSiteDataErrorMessage,
  updateOrderEmailErrorMessage,
} = storeToRefs(siteConfigurationStore);

const isSavePending = ref(false);

const updateSiteData = async () => {
  isSavePending.value = true;
  await siteConfigurationStore.updateSiteData();
  isSavePending.value = false;
};

const closeUpdateSiteDataErrorMessage = () => {
  siteConfigurationStore.clearUpdateSiteDataError();
};

const closeUpdateOrderEmailErrorMessage = () => {
  siteConfigurationStore.clearUpdateOrderEmailError();
};

// useUnsavedNotification(needShowSavingDataNotification, updateSiteData);
</script>

<style lang="postcss" scoped>
.config-cart {
  @apply space-y-6;
}
</style>
