<template>
  <button class="upload-icon-stub" type="button">
    <UiIcon class="w-6 h-6 text-blue-500" name="add-pic" />
  </button>
</template>

<script setup>
import { UiIcon } from 'account-ui';
</script>

<style lang="postcss" scoped>
.upload-icon-stub {
  @apply w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mx-auto cursor-pointer;

  &:hover {
    @apply bg-blue-100;
  }
}
</style>
