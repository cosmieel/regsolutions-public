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

      <SitesSearch v-if="userSitesStore.isAdmin" />
    </div>

    <div class="sites-list__body">
      <div v-if="userSitesStore.isFetchingSites" class="mt-4 flex justify-center">
        <UiSpinner />
      </div>
      <div v-else-if="isError" class="mt-4 text-red-500">Произошла ошибка: {{ error.message }}</div>

      <ul
        v-else-if="sitesList?.length > 0 && !userSitesStore.isEmptySearchResult"
        class="sites-list__sites"
      >
        <li v-for="(site, index) in sitesList" :key="site.id" class="sites-list__site">
          <SitesItem :site-data="site" :main-page-id="mainPages[index]" />
        </li>
      </ul>

      <div v-if="userSitesStore.isEmptySearchResult" class="mt-4">Ничего не найдено</div>
    </div>

    <div v-if="userSitesStore.total > SITES_PER_PAGE" class="sites-list__pagination">
      <UiPagination
        v-if="userSitesStore.total > 0"
        :total-count="userSitesStore.total"
        :per-page="SITES_PER_PAGE"
        @page-select="onPageSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiPagination, UiTitle, UiSpinner } from 'account-ui';
import { storeToRefs } from 'pinia';
import SitesItem from './sites-item.vue';
import { SITES_PER_PAGE } from '../constants.js';
import SitesSearch from '../sites-search/sites-search.vue';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const userSitesStore = useUserSitesStore();
const { isError, sitesList, error, mainPages } = storeToRefs(userSitesStore);

const onPageSelect = async (page) => {
  await userSitesStore.onPageSelect(page);
};
</script>

<style lang="postcss" scoped>
.sites-list {
  &__head {
    @apply flex justify-between pb-6 border-b border-gray-100 flex-wrap;
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

  &__pagination {
    @apply mt-10;
  }
}
</style>
