<template>
  <UiDomainInput
    v-model="field.value"
    :is-success="isSuccess"
    :max-length="maxLength"
    :is-disabled="isDisabled"
    :placeholder="placeholder"
    :error-message="field.errorMessage"
    :placeholder-domain="placeholderDomain"
  />
</template>

<script setup>
import { UiDomainInput } from 'account-ui';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: false,
    default: '',
  },

  placeholderDomain: {
    type: String,
    required: false,
    default: '',
  },

  isSuccess: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  maxLength: {
    type: String,
    required: false,
    default: '',
  },

  validateOnValueUpdate: {
    type: Boolean,
    required: false,
    default: true,
  },

  validateOnMount: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);
</script>
