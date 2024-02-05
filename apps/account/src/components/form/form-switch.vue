<template>
  <UiSwitch
    v-model="field.value"
    :tooltip="tooltip"
    :need-label="needLabel"
    :is-reversed="isReversed"
    :error-message="field.errorMessage"
  >
    <slot />
  </UiSwitch>
</template>

<script setup>
import { UiSwitch } from 'account-ui';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  tooltip: {
    type: String,
    default: '',
  },

  needLabel: {
    type: Boolean,
    default: false,
  },

  isReversed: {
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
