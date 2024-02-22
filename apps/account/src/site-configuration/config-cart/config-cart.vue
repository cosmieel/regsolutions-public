<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-cart">
    <ConfigEmail />
    <ConfigOrder />
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import ConfigEmail from './config-email/config-email.vue';
import ConfigOrder from './config-order/config-order.vue';
// TODO Hidden by this ticket - https://jira.runity.ru/browse/REGSOLUT-586
// import { useUnsavedNotification } from '../../utility/notifications/unsaved/use-unsaved-notification.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isLoading, isError, error } = storeToRefs(siteConfigurationStore);

// useUnsavedNotification(needShowSavingDataNotification, updateSiteData);
</script>

<style lang="postcss" scoped>
.config-cart {
  @apply space-y-6;
}
</style>
