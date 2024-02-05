<template>
  <component :is="dynamicIconComponent" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';

const property = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const dynamicIconComponent = computed(() => {
  return defineAsyncComponent(() => import(`../assets/icons/${property.name}.svg`));
});
</script>
