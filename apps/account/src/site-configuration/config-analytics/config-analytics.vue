<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="isError">Произошла ошибка: {{ error }}</div>
  <div v-else-if="site">
    <div class="text-3xl font-bold">Данные по сайту</div>

    <img :src="site.logo" :style="'max-height: 100px;'" />
    color: {{ site.color }} <br />
    dateCreate: {{ site.dateCreate }} <br />
    dateDeleted: {{ site.dateDeleted }} <br />
    dateUpdate: {{ site.dateUpdate }} <br />
    description: {{ site.description }} <br />
    domain: {{ site.domain }} <br />
    id: {{ site.id }} <br />
    name: {{ site.name }} <br />
    published: {{ site.published }} <br />
    type: {{ site.type }} <br />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { site, isLoading, isError, error } = storeToRefs(siteConfigurationStore);
</script>

<style scoped></style>
