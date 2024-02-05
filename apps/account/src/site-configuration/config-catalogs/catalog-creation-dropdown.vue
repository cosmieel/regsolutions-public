<template>
  <div
    class="catalog-creation-dropdown hs-dropdown [--strategy:absolute] [--adaptive:none] [--placement:bottom]"
  >
    <UiButton id="hs-add-catalog-dropdown" class="catalog-creation-dropdown__button" size="small">
      <UiIcon name="add" :size="16" />
      {{ button }}
    </UiButton>

    <UiDropdown
      class="catalog-creation-dropdown__dropdown"
      aria-labelledby="hs-add-catalog-dropdown"
    >
      <router-link class="ui-dropdown-link" :to="{ name: 'siteConfigurationCatalogCreate' }">
        Добавить вручную
      </router-link>

      <button type="button" class="ui-dropdown-link" @click="callAddCsvModal()">
        Загрузить файлом CSV
      </button>
      <button
        type="button"
        class="ui-dropdown-link"
        :data-hs-overlay="`#hs-add-catalog-bnovo-modal`"
      >
        Загрузить из Bnovo
      </button>
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiButton, UiDropdown, UiIcon } from 'account-ui';
import { callAddCsvModal } from './catalogs/modals/add-csv.js';

defineProps({
  button: {
    type: String,
    required: true,
  },
});
</script>

<style lang="postcss" scoped>
.catalog-creation-dropdown {
  @apply relative;

  &__button {
    @apply flex items-center justify-center;

    svg {
      @apply mr-1;
    }
  }

  &__dropdown {
    @apply w-[200px] left-[calc(-50%+6px)] translate-y-1;
  }
}
</style>
