<template>
  <form class="sites-search" @submit.prevent>
    <UiSearchInput
      :model-value="userSitesStore.searchValue"
      @update:model-value="userSitesStore.handleSearch"
    />
  </form>
</template>

<script setup>
import { UiSearchInput } from 'account-ui';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const userSitesStore = useUserSitesStore();
</script>

<style lang="postcss" scoped>
.sites-search {
  @apply w-full pt-6;
}
</style>
