<template>
  <DsIcon :name="name" :size="size" :inline="inline" />
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';

defineProps({
  name: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    default: 24,
  },

  inline: {
    type: Boolean,
    default: false,
  },
});
</script>
