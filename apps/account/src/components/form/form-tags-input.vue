<template>
  <UiTagsIconsInput
    v-model="field.value"
    :label="label"
    :placeholder="placeholder"
    :error-message="field.errorMessage"
    :max-tags="maxTags"
    :is-tag-single="isTagSingle"
  />
</template>

<script setup>
import { UiTagsIconsInput } from 'account-ui';
import { useField } from 'vee-validate';
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  maxTags: {
    type: Number,
    default: 50,
  },

  isTagSingle: {
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
