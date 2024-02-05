<template>
  <img :src="mediaUrl" :alt="path" v-bind="$attrs" />
</template>

<script setup>
import { computed } from 'vue';
import { useImageSizer } from './use-image-sizer.js';

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

const regex = /(^https:\/\/)|(^http:\/\/)/;

const mediaUrl = regex.test(props.path)
  ? props.path
  : useImageSizer(
      computed(() => props.path),
      props.size
    );
</script>
