<template>
  <BCoverHero v-if="type === 'hero'" />
  <BCoverContent v-else />
</template>

<script setup>
import BCoverContent from './b-cover-content.vue';
import BCoverHero from './b-cover-hero.vue';

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
