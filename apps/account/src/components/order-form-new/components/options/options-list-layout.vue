<template>
  <div class="options-list-layout">
    <div class="options-list-layout__main">
      <slot />
    </div>
    <template v-if="hasAfterDividerContent">
      <UiDivider />
      <div class="options-list-layout__after-divider">
        <slot name="afterDivider" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { UiDivider } from 'account-ui';
import { computed, useSlots } from 'vue';

const slots = useSlots();

const hasAfterDividerContent = computed(() => !!slots.afterDivider);
</script>

<style lang="postcss" scoped>
.options-list-layout {
  @apply flex flex-col gap-[8px];

  &__main,
  &__after-divider {
    @apply flex flex-col;
  }
}
</style>
