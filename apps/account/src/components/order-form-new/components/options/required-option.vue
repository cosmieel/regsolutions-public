<template>
  <BaseOption icon="warning-filled">
    {{ value ? 'Сделать необязательным' : 'Сделать обязательным' }}
  </BaseOption>
</template>

<script setup>
import BaseOption from './base-option.vue';

defineProps({
  value: {
    type: Boolean,
    required: true,
  },
});
</script>
