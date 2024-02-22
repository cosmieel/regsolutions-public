<template>
  <UiListItem class="base-option" is-hoverable>
    <UiIcon v-if="icon" :name="icon" :size="16" />
    <slot />
  </UiListItem>
</template>

<script setup>
import { UiIcon, UiListItem } from 'account-ui';

defineProps({
  icon: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
.base-option {
  @apply flex items-center gap-[12px];
}
</style>
