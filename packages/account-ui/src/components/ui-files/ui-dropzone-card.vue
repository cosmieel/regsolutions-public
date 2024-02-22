<template>
  <div class="ui-dropzone-card" :class="{ 'ui-dropzone-card_disabled': disabled }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="postcss" scoped>
.ui-dropzone-card {
  @apply border border-gray-200 rounded-lg py-[26px] px-[24px] px-6 relative;

  &_disabled {
    @apply opacity-[0.5] cursor-not-allowed pointer-events-none;
  }
}
</style>
