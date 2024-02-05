<template>
  <div
    class="ui-image-input"
    :class="[setDraggingClass, setErrorClass]"
    @onDragStart.prevent="onDragStart"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div v-if="imageSrc" class="ui-image-input__image">
      <img :src="imageSrc" class="max-h-[100px] max-w-[70px]" />
      <button class="ui-image-input__remove" type="button" @click="removeUploadedImage">
        <UiIcon name="close" :size="16" />
      </button>
    </div>
    <UploadIconStub v-else @click="triggerFileUploading" />

    <span class="ui-image-input__description">
      Перетащите или
      <label class="ui-image-input__input">
        Загрузите
        <input
          ref="fileInputReference"
          type="file"
          class="sr-only"
          accept="image/*"
          hidden
          @change="uploadImage"
        />
      </label>
    </span>
    <span class="ui-image-input__note"> Рекомендуем PNG 32х32px </span>
  </div>
  <p v-if="errorMessage" class="ui-image-input__error-message">
    {{ errorMessage }}
  </p>
</template>

<script setup>
import { computed, ref } from 'vue';
import UiIcon from './ui-icon.vue';
import UploadIconStub from '../../../../apps/account/src/components/upload-icon-stub.vue';

const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },

  imageSrc: {
    type: String,
    default: '',
  },
});

const image = ref(null);
const isDragging = ref(false);
const fileInputReference = ref(null);

const emit = defineEmits(['get-image-data', 'get-image-data-uri', 'upload-image']);

const triggerFileUploading = () => {
  fileInputReference.value.click();
};

const uploadImage = (event, isDragNDrop = false) => {
  const file = isDragNDrop ? event.dataTransfer?.files[0] : event.target?.files[0];

  const reader = new FileReader();

  if (!file || !/image.*/.test(file.type)) {
    return;
  }

  reader.readAsDataURL(file);
  reader.addEventListener('load', (event) => {
    emit('get-image-data', file);

    image.value = event.target?.result;
    emit('get-image-data-uri', image.value);
  });

  reader.addEventListener('loadend', () => {
    emit('upload-image');
  });
};

const onDragStart = (event) => {
  event.dataTransfer.effectAllowed = 'all';
  event.dataTransfer.dropEffect = 'move';
};

const onDragOver = () => {
  isDragging.value = true;
};
const onDragLeave = () => {
  isDragging.value = false;
};
const onDrop = (event) => {
  uploadImage(event, true);

  isDragging.value = false;
};

const removeUploadedImage = () => {
  image.value = '';
  fileInputReference.value.value = '';

  emit('get-image-data', image.value);
  emit('get-image-data-uri', image.value);
};

const setDraggingClass = computed(() => {
  return isDragging.value ? 'ring-2 ring-blue-600 border-white' : 'border-gray-200';
});

const setErrorClass = computed(() => {
  return {
    'ui-image-input_invalid': props.errorMessage,
  };
});
</script>

<style lang="postcss" scoped>
.ui-image-input {
  @apply p-[26px] block text-center border rounded-lg relative ring-blue-600;

  &_invalid {
    @apply border-red-100 ring-2 ring-red-100;

    &:hover {
      @apply border-red-100 ring-2 ring-red-100;
    }

    &:focus {
      @apply border-red-100 ring-2 ring-red-100;
    }
  }

  &__image {
    @apply inline-flex;
  }

  &__remove {
    @apply absolute top-[-12px] right-[-12px] w-6 h-6 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center;

    &:hover {
      @apply bg-gray-500;
    }

    svg {
      @apply text-white;
    }
  }

  &__description {
    @apply pt-4 block text-sm text-gray-700 font-medium;
  }

  &__input {
    @apply text-blue-600 cursor-pointer;

    &:hover {
      @apply underline underline-offset-4 decoration-1;
    }
  }

  &__note {
    @apply pt-0.5 block text-xs text-gray-400;
  }

  &__error-message {
    @apply text-sm text-left text-red-400 mt-3 leading-none;
  }
}
</style>
