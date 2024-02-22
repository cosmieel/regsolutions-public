<template>
  <button class="list-item" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },

  isHoverable: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const classes = computed(() => {
  const list = [];

  if (props.isActive) {
    list.push('active');
  }

  if (props.isHoverable) {
    list.push('hoverable');
  }

  if (props.disabled) {
    list.push('disabled');
  }

  return list.join(' ');
});
</script>

<style lang="postcss" scoped>
.list-item {
  @apply w-full block text-gray-700 text-sm leading-6 py-1 px-4 rounded-lg cursor-default text-left outline-none;

  &:not(.disabled).hoverable {
    @apply cursor-pointer;

    &:hover {
      @apply bg-blue-50 text-blue-600;
    }

    &.active {
      &:hover {
        @apply bg-blue-100;
      }
    }
  }

  &.active {
    @apply bg-blue-100 text-blue-600 !cursor-default;
  }

  &.disabled {
    @apply cursor-default opacity-[0.5];
  }
}
</style>
