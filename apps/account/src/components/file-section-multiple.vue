<template>
  <div class="file-section">
    <div class="file-section__main">
      <div class="file-section__title">{{ title }}</div>
      <div class="file-section__description">
        <slot></slot>
      </div>
      <label class="file-section__input">
        <UiButton
          is-outline
          size="small"
          class="file-section__button"
          :disabled="filesSrcList.length >= 10 || disabled"
          @click="triggerFileUploading"
          >Загрузить</UiButton
        >
        <input
          ref="fileInput"
          type="file"
          class="sr-only"
          accept="image/*"
          multiple="multiple"
          @change="uploadFile"
        />
      </label>
    </div>
    <div class="file-section__files-container">
      <div v-if="filesSrcList.length > 0" class="file-section__files">
        <div
          v-for="(fileSrc, index) in filesSrcList"
          :key="fileSrc"
          class="file-section__image"
          :class="{ 'file-section__image_visible': visibleImageIndex === index }"
        >
          <MediaImage
            :path="fileSrc"
            :size="config.resize.fileSectionMultiple"
            :alt="`${title} image`"
          />

          <button class="file-section__remove-image" type="button" @click="removeImage(index)">
            <UiIcon name="close" :size="12" />
          </button>
        </div>
        <div
          v-if="filesSrcList.length > 0"
          class="file-section__files-controls"
          :class="{ _next: visibleImageIndex === 0 }"
        >
          <UiButton
            v-if="visibleImageIndex > 0"
            class="file-section__files-control"
            is-outline
            is-button-icon
            size="small"
            @click="previousImage"
          >
            <UiIcon name="chevron-m-left" :size="14" />
          </UiButton>
          <UiButton
            v-if="visibleImageIndex < filesSrcList.length - 1"
            class="file-section__files-control"
            is-outline
            is-button-icon
            size="small"
            @click="nextImage"
          >
            <UiIcon name="chevron-m-right" :size="14" />
          </UiButton>
        </div>
      </div>

      <div v-else class="file-section__stub" @click="triggerFileUploading">
        <UploadIconStub />
        <div class="file-section__stub-text">Нет изображения...</div>
      </div>

      <div v-if="filesSrcList.length > 1" class="file-section__bullets">
        <div v-for="bullet in filesSrcList.length" :key="bullet" class="file-section__bullet">
          <span
            class="file-section__bullet-item"
            :class="{ 'file-section__bullet-item_active': bullet === visibleImageIndex + 1 }"
          ></span>
          <span class="sr-only">{{ bullet }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { UiButton, UiIcon } from 'account-ui';
import { ref } from 'vue';
import UploadIconStub from './upload-icon-stub.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  filesSrcList: {
    type: Array,
    default: () => [],
  },

  imageShape: {
    type: String,
    default: 'default',
  },

  isSquare: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const fileInput = ref(null);
const visibleImageIndex = ref(0);

const triggerFileUploading = () => {
  fileInput.value.click();
};

const emit = defineEmits(['get-file-data', 'get-file-data-uri', 'upload-file', 'remove-image']);

const uploadFile = (event) => {
  let files = event.target?.files;
  let file;

  const currentFilesCountMax = 10 - props.filesSrcList.length;

  if (!files) {
    return;
  }

  if (files.length > currentFilesCountMax) {
    files = Object.fromEntries(Object.entries(files).slice(0, currentFilesCountMax));
  }

  for (const fileData in files) {
    if (!Object.hasOwnProperty.call(files, fileData)) {
      return;
    }

    const reader = new FileReader();

    file = files[fileData];

    if (!/image.*/.test(file.type)) {
      return;
    }

    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      emit('get-file-data', files[fileData]);
    });

    reader.addEventListener('loadend', () => {
      emit('upload-file', files[fileData]);
    });
  }
};

const nextImage = () => {
  visibleImageIndex.value++;
};
const previousImage = () => {
  visibleImageIndex.value--;
};

const removeImage = (index) => {
  emit('remove-image', index);

  if (index === 0) {
    nextImage();
  }

  if (index === props.filesSrcList.length - 1) {
    previousImage();
  }
};
</script>

<style lang="postcss" scoped>
.file-section {
  @apply flex justify-between text-gray-700;

  &__main {
    @apply pr-10;
  }

  &__title {
    @apply text-sm font-medium leading-6 pb-2;
  }

  &__description {
    @apply text-sm leading-6 text-gray-400 pb-4;
  }

  &__input {
    @apply block w-[89px];
  }

  &__button {
    @apply w-full;
  }

  &__files-container {
    @apply relative w-full max-w-[208px] h-[190px] flex items-center justify-center border border-gray-200 rounded-lg transition-all;

    &:hover {
      @apply ring-4 ring-offset-1 ring-gray-800/[.05];
    }
  }

  &__files-controls {
    @apply absolute z-20 w-[calc(100%+32px)] flex justify-between top-[calc(50%-19px)] left-[-16px];

    &._next {
      @apply justify-end;
    }
  }

  &__files-control {
    @apply rounded-full max-w-[32px];

    svg {
      @apply flex-none;
    }
  }

  &__files {
    @apply flex w-full h-full;
  }

  &__image {
    @apply w-full h-full flex-none hidden relative;

    &_visible {
      @apply block;
    }

    img {
      @apply object-cover w-full h-full rounded-lg;
    }
  }

  &__remove-image {
    @apply absolute top-[-8px] right-[-8px] w-6 h-6 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center;

    &:hover {
      @apply bg-gray-500;
    }

    svg {
      @apply text-white;
    }
  }

  &__stub-text {
    @apply text-sm leading-6 pt-[11px];
  }

  &__bullets {
    @apply flex justify-center items-center absolute bottom-[-18px] pt-2.5 w-full;
  }

  &__bullet {
    @apply flex;
  }

  &__bullet-item {
    @apply w-2 h-2 bg-gray-200 rounded-full mx-0.5 transition;

    &_active {
      @apply bg-blue-500;
    }
  }
}
</style>
