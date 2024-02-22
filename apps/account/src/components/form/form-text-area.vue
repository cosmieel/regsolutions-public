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
  >
    <template v-if="hasAfterLabelSlot" #afterLabel>
      <slot name="afterLabel" />
    </template>
  </UiTextarea>
</template>

<script setup>
import { UiTextarea } from 'account-ui';
import { useField } from 'vee-validate';
import { computed, reactive, useSlots } from 'vue';

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

const slots = useSlots();

const hasAfterLabelSlot = computed(() => !!slots.afterLabel);

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);
</script>
