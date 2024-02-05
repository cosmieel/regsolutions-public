<template>
  <BBannerHero v-if="type === 'hero'" />
  <BBannerContent v-else />
</template>

<script setup>
import BBannerContent from './b-banner-content.vue';
import BBannerHero from './b-banner-hero.vue';

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
