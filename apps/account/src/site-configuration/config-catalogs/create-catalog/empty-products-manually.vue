<template>
  <div class="empty-products-manually">
    <div class="empty-products-manually__inner">
      <div class="empty-products-manually__title">Еще нет товаров...</div>
      <div class="empty-products-manually__text">Наполните ваш каталог товарами</div>
      <div class="empty-products-manually__add">
        <UiButton class="empty-products-manually__button" size="small" @click="$emit('add')">
          <UiIcon name="add" :size="16" />
          Добавить товар
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';

defineEmits(['add']);
</script>

<style lang="postcss" scoped>
.empty-products-manually {
  @apply pb-6;

  &__inner {
    @apply text-center flex flex-col items-center;
  }

  &__title {
    @apply pt-6 text-base font-medium;
  }

  &__text {
    @apply pb-4 text-sm leading-6 text-gray-500;
  }

  &__button {
    @apply flex items-center justify-center;

    svg {
      @apply mr-1;
    }
  }
}
</style>
