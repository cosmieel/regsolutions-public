<template>
  <img :src="mediaUrl" :alt="path" v-bind="$attrs" />
</template>

<script setup>
import { constructMediaUrl } from 'site-builder/src/services/construct-media-url/construct-media-url.js';
import { computed } from 'vue';
import { useSiteStorage } from '../../site-storage/site-storage.js';

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

const siteStorage = useSiteStorage();

const mediaUrl = computed(() =>
  constructMediaUrl(
    `${siteStorage.storage.options.hosts.storage}${props.path}`,
    siteStorage.storage.options.hosts.resizer,
    props.size
  )
);
</script>
