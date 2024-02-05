<template>
  <FileSectionMultiple
    :title="title"
    :image-shape="imageShape"
    :is-square="isSquare"
    :files-src-list="field.value.value"
    :disabled="disabled"
    @remove-image="handelRemove"
    @upload-file="handleUpload"
  >
    <slot />
  </FileSectionMultiple>
</template>

<script setup>
import { useField } from 'vee-validate';
import FileSectionMultiple from '../file-section-multiple.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    default: '',
  },

  imageShape: {
    type: String,
    default: 'default',
  },

  isSquare: {
    type: Boolean,
    default: false,
  },

  fileUpload: {
    type: Function,
    required: true,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const field = useField(props?.name || '', undefined, {
  validateOnMount: props.validateOnMount,
  validateOnValueUpdate: props.validateOnValueUpdate,
});

const handleUpload = async (img) => {
  const uploadedImage = await props.fileUpload(img);

  field.setValue([...field.value.value, uploadedImage]);
};

const handelRemove = (fileIndex) => {
  field.setValue(field.value.value.filter((_, index) => fileIndex !== index));
};
</script>
