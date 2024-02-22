<template>
  <UiButton
    is-ghost-blue
    class="ui-pagination-button"
    :class="{
      'ui-pagination-button_active': active,
      'ui-pagination-button_disabled': disabled,
    }"
  >
    <UiIcon v-if="prev" name="chevron-m-left" :size="16" />
    <UiIcon v-if="next" name="chevron-m-right" :size="16" />
    <span v-if="truncated">•••</span>
    <slot v-if="page" />
  </UiButton>
</template>

<script setup>
import UiButton from '../ui-button.vue';
import UiIcon from '../ui-icon.vue';

defineProps({
  prev: {
    type: Boolean,
    default: false,
  },

  next: {
    type: Boolean,
    default: false,
  },

  truncated: {
    type: Boolean,
    default: false,
  },

  page: {
    type: Boolean,
    default: true,
  },

  active: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="postcss" scoped>
.ui-pagination-button {
  @apply text-gray-700 w-10 select-none;

  &:hover {
    @apply text-blue-600 bg-blue-50;
  }

  &:active {
    @apply ring-0 bg-blue-100;
  }

  &_active {
    @apply text-blue-600 bg-blue-100 pointer-events-none;
  }

  &_disabled {
    @apply text-gray-300 border-transparent bg-transparent pointer-events-none;
  }
}
</style>
