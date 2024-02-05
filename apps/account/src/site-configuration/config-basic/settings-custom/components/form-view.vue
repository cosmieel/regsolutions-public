<template>
  <div class="settings-custom-form-view">
    <FormTextarea :name="HEAD_KEY" label="Tag <head>" placeholder="<head>" />
    <FormTextarea :name="BODY_KEY" label="Tag <body>" placeholder="<body>" />
  </div>
</template>

<script setup>
import FormTextarea from 'account/src/components/form/form-text-area.vue';
import { HEAD_KEY, BODY_KEY } from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.settings-custom-form-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
