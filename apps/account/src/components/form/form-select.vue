<template>
  <UiSelect
    v-model="field.value"
    :label="label"
    :options="options"
    :error-message="field.errorMessage"
  />
</template>

<script setup>
import { UiSelect } from 'account-ui';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  options: {
    type: Array,
    default: () => [],
  },

  label: {
    type: String,
    default: '',
  },
});

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);
</script>
