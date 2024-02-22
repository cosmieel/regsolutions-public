<template>
  <img :src="constructedUrl" :alt="alt" v-bind="$attrs" />
</template>

<script setup>
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { getConstructedUrl } from 'site-ui/src/services/get-constructed-url/get-constructed-url.js';
import { computed, inject } from 'vue';

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

const { hosts } = inject(OPTIONS_KEY);

const constructedUrl = computed(() => {
  return getConstructedUrl(props.path, hosts, props.size);
});

const alt = computed(() => props.path.split('/').at(-1));
</script>
