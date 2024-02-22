<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-domain">
    <FreeDomain />

    <PaidDomain />

    <!--    TODO: Срыто в этой задаче https://jira.runity.ru/browse/REGSOLUT-716-->
    <!--    <FaqSection />-->
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
// import FaqSection from './faq-section/faq-section.vue';
import FreeDomain from './free-domain/free-domain.vue';
import PaidDomain from './paid-domain/paid-domain.vue';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isLoading, isError, error } = storeToRefs(siteConfigurationStore);
</script>

<style lang="postcss" scoped>
.config-domain {
  @apply space-y-6;
}
</style>
