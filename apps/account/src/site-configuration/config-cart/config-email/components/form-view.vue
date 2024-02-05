<template>
  <div class="config-email-form-view">
    <FormInput
      :name="EMAIL_KEY"
      label="E-mail"
      type="text"
      :max-length="String(MAX_LENGTH_EMAIL)"
    />
  </div>
</template>

<script setup>
import FormInput from 'account/src/components/form/form-input.vue';
import { EMAIL_KEY, MAX_LENGTH_EMAIL } from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.config-email-form-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
