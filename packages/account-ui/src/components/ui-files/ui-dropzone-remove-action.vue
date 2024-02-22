<template>
  <button class="ui-dropzone-remove-action" type="button">
    <UiIcon name="close" :size="10" />
  </button>
</template>

<script setup>
import UiIcon from '../ui-icon.vue';
</script>

<style lang="postcss" scoped>
.ui-dropzone-remove-action {
  @apply w-6 h-6 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center;

  &:hover {
    @apply bg-gray-500;
  }

  svg {
    @apply text-white;
  }
}
</style>
