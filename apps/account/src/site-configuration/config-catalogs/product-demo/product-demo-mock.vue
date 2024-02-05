<template>
  <figure class="product-demo-mock">
    <div class="product-demo-mock__head">
      <div class="product-demo-mock__circles">
        <span class="product-demo-mock__circle"></span>
        <span class="product-demo-mock__circle"></span>
        <span class="product-demo-mock__circle"></span>
      </div>
    </div>

    <div class="product-demo-mock__content">
      <slot></slot>
    </div>
  </figure>
</template>

<script setup></script>

<style lang="postcss" scoped>
.product-demo-mock {
  @apply relative w-full h-auto border border-gray-200 rounded-lg shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)] overflow-hidden;

  &__head {
    @apply relative flex items-center bg-gray-100 rounded-t-lg p-3;
  }

  &__circles {
    @apply flex space-x-[6px];
  }

  &__circle {
    @apply w-[0.55rem] h-[0.55rem] bg-white rounded-full;
  }

  &__content {
    @apply px-10;
  }
}
</style>
