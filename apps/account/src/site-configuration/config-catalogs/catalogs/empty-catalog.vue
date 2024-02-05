<template>
  <div class="empty-catalog">
    <div class="empty-catalog__inner">
      <div class="empty-catalog__title">Нет каталогов...</div>
      <div class="empty-catalog__text">Добавьте сюда каталоги с вашими товарами</div>
      <CatalogCreationDropdown :button="'Создать каталог'" />
    </div>
  </div>
</template>

<script setup>
import CatalogCreationDropdown from '../catalog-creation-dropdown.vue';
</script>

<style lang="postcss" scoped>
.empty-catalog {
  &__inner {
    @apply text-center flex flex-col items-center;
  }

  &__title {
    @apply text-base font-medium;
  }

  &__text {
    @apply pb-4 text-sm leading-6 text-gray-500;
  }
}
</style>
