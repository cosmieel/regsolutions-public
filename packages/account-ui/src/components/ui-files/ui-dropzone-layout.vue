<template>
  <UiDropzoneCard class="dropzone-layout" :class="classes" :disabled="loading || disabled">
    <slot name="input" />
    <div v-if="loading" class="dropzone-layout__spinner-wrapper">
      <UiSpinner class="dropzone-layout__spinner" />
    </div>

    <template v-if="!hasCustomContent">
      <div class="dropzone-layout__input-wrapper">
        <UploadIconStub class="dropzone-layout__button" />
      </div>

      <div v-if="fileNames.length > 0" class="dropzone-layout__filename">
        {{ fileNames.join(', ') }}
      </div>

      <div v-if="isHasDescription" class="dropzone-layout__description">
        <slot name="description" />
      </div>

      <div v-if="hasAcceptedFilesDescription" class="dropzone-layout__accept">
        <slot name="acceptedFilesDescription" />
      </div>
    </template>

    <slot v-else />
  </UiDropzoneCard>
</template>

<script setup>
import UploadIconStub from 'account/src/components/upload-icon-stub.vue';
import { computed, useSlots } from 'vue';
import UiDropzoneCard from './ui-dropzone-card.vue';
import UiSpinner from '../ui-spinner.vue';

const slots = useSlots();

const isHasDescription = computed(() => !!slots.description);
const hasAcceptedFilesDescription = computed(() => !!slots.acceptedFilesDescription);

const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },

  fileNames: {
    type: Array,
    required: false,
    default: () => [],
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },

  isDragActive: {
    type: Boolean,
    required: false,
    default: false,
  },

  hasCustomContent: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const classes = computed(() => {
  const classes = [];

  if (props.disabled || props.loading) {
    classes.push('dropzone-layout_disabled');
  }

  if (props.hasError) {
    classes.push('dropzone-layout_error');
  }

  if (props.isDragActive) {
    classes.push('dropzone-layout_drag-active');
  }

  return classes.join(' ');
});
</script>

<style lang="postcss" scoped>
.dropzone-layout {
  @apply cursor-pointer;

  &:not(&_drag-active, &_error, &_disabled) {
    &:hover {
      @apply border-white ring-4 ring-gray-100;
    }
  }

  &_drag-active {
    &:not(.dropzone-layout_disabled) {
      @apply ring-4 ring-blue-700/20 border-white;
    }
  }

  &_error {
    @apply border border-red-500;
  }

  &_disabled {
    .dropzone-layout__button {
      @apply pointer-events-none;
    }
  }

  &__input-wrapper {
    @apply flex flex-col items-center w-full;
  }

  &__filename {
    @apply text-xs leading-6 pt-2 text-gray-400 truncate whitespace-nowrap text-center;
  }

  &__description {
    @apply text-sm leading-6 pb-1 pt-[11px] text-center;
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
