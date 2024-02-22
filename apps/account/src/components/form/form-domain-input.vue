<template>
  <DomainInput
    v-model="field.value"
    :is-disabled="isDisabled"
    :error-message="field.errorMessage"
  />
</template>

<script setup>
import DomainInput from 'account/src/components/text-fields/domain-input.vue';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  isDisabled: {
    type: Boolean,
    default: false,
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
