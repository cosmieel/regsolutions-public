<template>
  <section class="ui-dropzone-section">
    <div class="ui-dropzone-section__left">
      <div class="ui-dropzone-section__content">
        <UiTitle v-if="hasTitle" class="ui-dropzone-section__title">
          <slot name="title" />
        </UiTitle>
        <p v-if="hasDescription" class="ui-dropzone-section__description">
          <slot name="description" />
        </p>
      </div>
      <UiButton
        class="ui-dropzone-section__button"
        is-outline
        size="small"
        :disabled="isDisabled"
        @click="getRootProps().onClick"
        >Загрузить</UiButton
      >
    </div>

    <UiDropzoneLayout
      v-bind="getRootProps()"
      class="ui-dropzone-section__dropzone"
      :is-drag-active="isDragActive"
      :has-error="hasError"
      :loading="loading"
      :disabled="isDisabled"
      :has-custom-content="hasCustomContent"
    >
      <template #input>
        <input :name="name" v-bind="getInputProps()" :disabled="isDisabled" />
      </template>

      <template v-if="hasDropzoneDescription" #description>
        <slot name="dropzoneDescription" />
      </template>

      <template v-if="hasAcceptedFilesDescription" #acceptedFilesDescription>
        <slot name="acceptedFilesDescription" :accepted-file-labels="acceptedFileLabels" />
      </template>

      <slot />
    </UiDropzoneLayout>
  </section>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import UiDropzoneLayout from './ui-dropzone-layout.vue';
import { useDropzone } from './use-dropzone.js';
import UiButton from '../ui-button.vue';
import UiTitle from '../ui-title.vue';

const emit = defineEmits(['drop']);

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

  hasCustomContent: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slots = useSlots();

const hasTitle = computed(() => !!slots.title);
const hasDescription = computed(() => !!slots.description);
const hasDropzoneDescription = computed(() => !!slots.dropzoneDescription);
const hasAcceptedFilesDescription = computed(() => !!slots.acceptedFilesDescription);

const { getRootProps, getInputProps, name, isDragActive, error } = useDropzone(props, emit);

const isDisabled = computed(() => props.disabled || props.loading);
const hasError = computed(() => !!error.value && !props.loading);
const acceptedFileLabels = computed(() => props.accept.map((item) => item.label.toUpperCase()));
</script>

<style lang="postcss" scoped>
.ui-dropzone-section {
  @apply flex justify-between text-gray-700 gap-10;

  &__title {
    @apply text-sm font-medium leading-6 pb-2 text-left;
  }

  &__description {
    @apply text-sm leading-6 text-gray-400 pb-4;
  }

  &__button {
    @apply w-full max-w-[89px];
  }

  &__dropzone {
    @apply w-full max-w-[240px] h-[151px];
  }
}
</style>
