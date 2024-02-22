<template>
  <OrderForm
    :fields="fields.value"
    :button="button.value"
    :terms="terms.value"
    @change="handleChange"
  />
</template>

<script setup>
import OrderForm from 'account/src/components/order-form-new/order-form.vue';
import { useField } from 'vee-validate';
import { reactive } from 'vue';
import { FIELDS_KEY, TERMS_KEY, BUTTON_KEY } from './constants.js';

const props = defineProps({
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

const fields = reactive(
  useField(FIELDS_KEY, undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);

const button = reactive(
  useField(BUTTON_KEY, undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);

const terms = reactive(
  useField(TERMS_KEY, undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);

const handleChange = (values) => {
  fields.handleChange(values[FIELDS_KEY]);

  button.handleChange(values[BUTTON_KEY]);

  terms.handleChange(values[TERMS_KEY]);
};
</script>
