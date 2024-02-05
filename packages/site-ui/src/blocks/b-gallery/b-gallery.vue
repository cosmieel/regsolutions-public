<template>
  <BGalleryHero v-if="type === 'hero'" />
  <BGalleryContent v-else />
</template>

<script setup>
import BGalleryContent from './b-gallery-content.vue';
import BGalleryHero from './b-gallery-hero.vue';

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
