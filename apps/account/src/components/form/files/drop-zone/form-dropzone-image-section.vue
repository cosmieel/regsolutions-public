<template>
  <DropzoneImageSection
    ref="dropzoneImageSectionReference"
    v-model="field.value"
    :name="name"
    :image-shape="imageShape"
    :min-file-bytes="minFileBytes"
    :max-file-bytes="maxFileBytes"
  >
    <template v-if="hasTitle" #title>
      <slot name="title" />
    </template>

    <template v-if="hasDescription" #description>
      <slot name="description" />
    </template>
  </DropzoneImageSection>
</template>

<script setup>
import DropzoneImageSection from 'account/src/components/files/drop-zone/dropzone-image-section/dropzone-image-section.vue';
import { useField } from 'vee-validate';
import { computed, reactive, ref, useSlots } from 'vue';

const dropzoneImageSectionReference = ref(null);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  imageShape: {
    type: String,
    required: false,
    default: '',
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

const slots = useSlots();

const hasTitle = computed(() => !!slots.title);
const hasDescription = computed(() => !!slots.description);

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);

const exposeValues = computed(() => {
  return {
    isLoading: dropzoneImageSectionReference.value.isLoading,
  };
});

defineExpose({
  exposeValues,
});
</script>
