<template>
  <UiDomainInput
    :model-value="modelValue"
    :placeholder-domain="FREE_DOMAIN"
    :error-message="errorMessage"
    :is-disabled="isDisabled"
    max-length="63"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
import { FREE_DOMAIN } from 'account/src/utility/constants/domain.js';
import { UiDomainInput } from 'account-ui';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>
