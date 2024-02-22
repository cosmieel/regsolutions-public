<template>
  <UiInput
    v-model="field.value"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :is-success="isSuccess"
    :label="label"
    :trailing="trailing"
    :max-length="maxLength"
    :is-disabled="isDisabled"
    :error-message="field.errorMessage"
  >
    <template v-if="hasAfterLabelSlot" #afterLabel>
      <slot name="afterLabel" />
    </template>
    <template v-if="hasLeftSlot" #left>
      <slot name="left" />
    </template>
    <template v-if="hasRightSlot" #right>
      <slot name="right" />
    </template>
  </UiInput>
</template>

<script setup>
import { UiInput } from 'account-ui';
import { useField } from 'vee-validate';
import { computed, reactive, useSlots } from 'vue';

const slots = useSlots();

const hasAfterLabelSlot = computed(() => !!slots.afterLabel);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: false,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  isSuccess: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: '',
  },

  trailing: {
    type: String,
    default: '',
  },

  maxLength: {
    type: String,
    default: '',
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

const hasRightSlot = computed(() => slots.right);
const hasLeftSlot = computed(() => slots.left);
</script>
