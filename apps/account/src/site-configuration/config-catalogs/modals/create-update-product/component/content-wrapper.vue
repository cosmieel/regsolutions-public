<template>
  <div class="product-modal-content">
    <div class="product-modal-content__main">
      <slot />
    </div>
    <div class="product-modal-content__demo">
      <DemoView />
    </div>
  </div>
</template>

<script setup>
import DemoView from './demo-view.vue';
</script>

<style lang="postcss" scoped>
.product-modal-content {
  @apply flex justify-between;

  &__main {
    @apply w-1/2 px-6;
  }

  &__demo {
    @apply w-1/2 px-10 pt-6 pb-[100px];
  }
}
</style>
