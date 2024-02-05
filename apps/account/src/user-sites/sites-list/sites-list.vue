<template>
  <div class="sites-list">
    <div class="sites-list__head">
      <UiTitle headline-level="2" class="sites-list__title"> Мои сайты </UiTitle>

      <router-link :to="{ name: 'accountSitePreSurvey' }" class="block">
        <UiButton class="sites-list__button">
          <UiIcon name="add" :size="16" class="sites-list__button-icon" />
          <span class="sites-list__button-text">Новый сайт</span>
        </UiButton>
      </router-link>
    </div>

    <div class="sites-list__body">
      <div v-if="isLoading">Загрузка...</div>
      <div v-else-if="isError">Произошла ошибка: {{ error }}</div>

      <ul v-else-if="sitesList" class="sites-list__sites">
        <li v-for="(site, index) in sitesList" :key="site.id" class="sites-list__site">
          <SitesItem :site-data="site" :main-page-id="mainPages[index]" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiTitle } from 'account-ui';
import { storeToRefs } from 'pinia';
import SitesItem from './sites-item.vue';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const userSitesStore = useUserSitesStore();
const { isLoading, isError, sitesList, error, mainPages } = storeToRefs(userSitesStore);
</script>

<style lang="postcss" scoped>
.sites-list {
  &__head {
    @apply flex justify-between pb-6 border-b border-gray-100;
  }

  &__title {
    @apply pb-0 text-left;
  }

  &__button {
    @apply flex w-auto;

    &-icon {
      @apply mr-1;
    }

    &-text {
      @apply font-medium;
    }
  }

  &__sites {
    @apply pt-6 grid grid-cols-2 gap-6;
  }

  &__site {
    @apply flex;
  }
}
</style>
