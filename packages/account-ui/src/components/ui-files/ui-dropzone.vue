<template>
  <UiDropzoneLayout
    v-bind="getRootProps()"
    :disabled="isDisabled"
    :loading="loading"
    :file-names="fileNames"
    :has-error="hasError"
    :is-drag-active="isDragActive"
  >
    <template #input>
      <input :name="name" v-bind="getInputProps()" :disabled="isDisabled" />
    </template>

    <template v-if="isHasDescription" #description>
      <slot name="description" />
    </template>

    <template v-if="hasAcceptedFilesDescription" #acceptedFilesDescription>
      <slot name="acceptedFilesDescription" :accepted-file-labels="acceptedFileLabels" />
    </template>
  </UiDropzoneLayout>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import UiDropzoneLayout from './ui-dropzone-layout.vue';
import { useDropzone } from './use-dropzone.js';

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: undefined,
  },

  accept: {
    type: Array,
    required: false,
    default: () => [],
  },

  loading: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  minFileBytes: {
    type: Number,
    required: false,
    default: 0,
  },

  maxFileBytes: {
    type: Number,
    required: false,
    default: undefined,
  },

  preventDropOnDocument: {
    type: Boolean,
    required: false,
    default: true,
  },

  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slots = useSlots();

const isHasDescription = computed(() => !!slots.description);
const hasAcceptedFilesDescription = computed(() => !!slots.acceptedFilesDescription);

const emit = defineEmits(['drop']);

const { getRootProps, getInputProps, name, isDragActive, error, acceptedFiles } = useDropzone(
  props,
  emit
);

const isDisabled = computed(() => props.disabled || props.loading);
const hasError = computed(() => !!error.value && !props.loading);
const fileNames = computed(() => acceptedFiles.value.map((file) => file.name));
const acceptedFileLabels = computed(() => props.accept.map((item) => item.label.toUpperCase()));
</script>
