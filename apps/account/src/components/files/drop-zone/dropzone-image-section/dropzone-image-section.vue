<template>
  <UiDropzoneSection
    :name="name"
    :loading="isLoading"
    :accept="[FILE_MEDIA_TYPES.all]"
    :max-file-bytes="maxFileBytes"
    :min-file-bytes="minFileBytes"
    :has-custom-content="!!localValue"
    @drop="handleUpload"
  >
    <DropzoneImagePreview
      :loading="isLoading"
      :shape="imageShape"
      :src="localValue"
      @remove="handleClear"
    />

    <template v-if="hasTitle" #title>
      <slot name="title" />
    </template>

    <template v-if="hasDescription" #description>
      <slot name="description" />
    </template>

    <template #dropzoneDescription> Нет изображения... </template>
  </UiDropzoneSection>
</template>

<script setup>
import { useUploadMutation } from 'account/src/components/composables/upload-mutation';
import { UiDropzoneSection, FILE_MEDIA_TYPES } from 'account-ui';
import { computed, ref, useSlots, watch } from 'vue';
import DropzoneImagePreview from './dropzone-image-preview.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  name: {
    type: String,
    required: false,
    default: undefined,
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

  imageShape: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const hasTitle = computed(() => !!slots.title);
const hasDescription = computed(() => !!slots.description);

const uploadMutation = useUploadMutation();

const isLoading = ref(false);

const localValue = ref(props.modelValue);

const handleUpload = async (result) => {
  if (result.acceptFiles?.[0]) {
    isLoading.value = true;

    try {
      const response = await uploadMutation.mutateAsync({ file: result.acceptFiles[0] });

      if (response?.url) {
        localValue.value = response.url;

        emit('update:modelValue', localValue.value);
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const handleClear = () => {
  if (localValue.value) {
    localValue.value = '';

    emit('update:modelValue', '');
  }
};

watch(
  () => props.modelValue,
  (current) => {
    localValue.value = current;
  }
);

defineExpose({
  isLoading,
});
</script>
