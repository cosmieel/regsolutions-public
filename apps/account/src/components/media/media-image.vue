<template>
  <img :src="mediaUrl" :alt="path" v-bind="$attrs" />
</template>

<script setup>
import { computed } from 'vue';
import { useMediaUrl } from './utility/use-media-url.js';

const props = defineProps({
  size: {
    type: String,
    required: false,
    default: '',
  },

  path: {
    type: String,
    required: true,
    default: '',
  },
});

const mediaUrl = computed(() => useMediaUrl(props.path, props.size).value);
</script>
