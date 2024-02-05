<template>
  <component :is="headline" class="ui-title">
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  headlineLevel: {
    type: String,
    default: '1',
  },
});

const headline = computed(() => {
  return `h${props.headlineLevel}`;
});
</script>

<style lang="postcss" scoped>
.ui-title {
  @apply text-xl font-medium leading-6 text-center;
}
</style>
