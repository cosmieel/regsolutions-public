<template>
  <UiTextarea
    v-model="field.value"
    :name="name"
    :placeholder="placeholder"
    :label="label"
    :max-length="maxLength"
    :is-disabled="isDisabled"
    :error-message="field.errorMessage"
    :counter="counter"
  />
</template>

<script setup>
import { UiTextarea } from 'account-ui';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    default: '',
  },

  counter: {
    type: String,
    default: '',
  },

  maxLength: {
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

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);
</script>
