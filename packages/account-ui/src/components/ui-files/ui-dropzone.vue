<template>
  <div class="dropzone" :class="classes" v-bind="getRootProps()">
    <div v-if="loading" class="dropzone__spinner-wrapper">
      <UiSpinner class="dropzone__spinner" />
    </div>
    <div class="dropzone__input-wrapper">
      <UploadIconStub class="dropzone__button" />

      <input :name="name" :disabled="disabled" v-bind="getInputProps()" />
    </div>

    <div v-if="fileNames.length > 0" class="dropzone__filename">
      {{ fileNames.join(', ') }}
    </div>

    <div v-if="isHasDescription" class="dropzone__description">
      <slot name="description" />
    </div>

    <div v-if="acceptedFileLabels.length > 0" class="dropzone__accept">
      Формат {{ acceptedFileLabels.join(', ') }}
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import { useDropzone } from './use-dropzone.js';
import UploadIconStub from '../../../../../apps/account/src/components/upload-icon-stub.vue';
import UiSpinner from '../ui-spinner.vue';

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

  imageUrl: {
    type: String,
    required: false,
    default: null,
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

const emit = defineEmits(['drop']);

const { getRootProps, getInputProps, name, isDragActive, error, acceptedFiles } = useDropzone(
  props,
  emit
);

const isDisabled = computed(() => props.disabled || props.loading);
const hasError = computed(() => !!error.value && !props.loading);
const fileNames = computed(() => acceptedFiles.value.map((file) => file.name));
const acceptedFileLabels = computed(() => props.accept.map((item) => item.label.toUpperCase()));

const classes = computed(() => {
  const classes = [];

  if (isDisabled.value || props.isLoading) {
    classes.push('dropzone_disabled');
  }

  if (hasError.value) {
    classes.push('dropzone_error');
  }

  if (isDragActive.value) {
    classes.push('dropzone_drag-active');
  }

  if (props.disabled) {
    classes.push('dropzone_disabled');
  }

  return classes.join(' ');
});
</script>

<style lang="postcss" scoped>
.dropzone {
  @apply border border-gray-200 rounded-lg py-[26px] px-[24px] px-6 relative cursor-pointer;

  &:not(&_drag-active) &:not(&_error) &:not(&_disabled) {
    &:hover {
      @apply border-white ring-4 ring-gray-100;
    }
  }

  &_drag-active {
    @apply ring-4 ring-blue-700/20 border-white;
  }

  &_error {
    @apply border border-red-500;
  }

  &_disabled {
    @apply opacity-[0.5] cursor-not-allowed;

    .dropzone__button {
      @apply pointer-events-none;
    }
  }

  &__input-wrapper {
    @apply flex flex-col items-center w-full;
  }

  &__filename {
    @apply text-xs leading-6 pt-2 text-gray-400;
  }

  &__description {
    @apply text-sm leading-6 pb-1 pt-[11px];
  }

  &__accept {
    @apply text-xs text-gray-400;
  }

  &__button {
    @apply w-10 h-10 p-0;
  }

  &__spinner-wrapper {
    @apply absolute left-0 top-0 w-full h-full flex justify-center items-center;
  }

  &__spinner {
    @apply w-10 h-10;
  }
}
</style>
