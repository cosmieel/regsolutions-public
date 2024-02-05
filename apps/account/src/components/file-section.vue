<template>
  <div class="file-section">
    <div class="file-section__main">
      <div class="file-section__title">{{ title }}</div>
      <div class="file-section__description">
        <slot></slot>
      </div>
      <label class="file-section__input">
        <UiButton is-outline size="small" class="file-section__button" @click="triggerFileUploading"
          >Загрузить</UiButton
        >
        <input ref="fileInput" type="file" class="sr-only" accept="image/*" @change="uploadFile" />
      </label>
    </div>
    <div class="file-section__file" @click="triggerFileUploading">
      <div v-if="fileSrc" class="file-section__image" :class="[mediaPropsByShape.className]">
        <MediaImage :path="fileSrc" :size="mediaPropsByShape.size" :alt="`${title} image`" />

        <button class="file-section__remove-image" type="button" @click.stop="removeFile">
          <UiIcon name="close" :size="10" />
        </button>
      </div>
      <div v-else class="file-section__stub">
        <UploadIconStub />
        <div class="file-section__stub-text">Нет изображения...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import { UiButton, UiIcon } from 'account-ui';
import { computed, ref } from 'vue';
import UploadIconStub from './upload-icon-stub.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  fileSrc: {
    type: String,
    default: '',
  },

  imageShape: {
    type: String,
    default: 'default',
  },
});

const fileInput = ref(null);

const triggerFileUploading = () => {
  fileInput.value.click();
};

const emit = defineEmits(['get-file-data', 'get-file-data-uri', 'upload-file', 'remove-file']);

const uploadFile = (event) => {
  const file = event.target?.files[0];

  const reader = new FileReader();

  if (!file || !/image.*/.test(file.type)) {
    return;
  }

  reader.readAsDataURL(file);
  reader.addEventListener('load', () => {
    emit('get-file-data', file);
  });

  reader.addEventListener('loadend', () => {
    emit('upload-file');
  });
};

const removeFile = () => {
  emit('remove-file');
};

const mediaPropsByShape = computed(() => {
  const imageClass = 'file-section__image';

  switch (props.imageShape) {
    case 'rounded': {
      return {
        size: '64x64',
        className: `${imageClass}_rounded`,
      };
    }
    case 'full': {
      return {
        size: 'x300',
        className: `${imageClass}_full`,
      };
    }
    default: {
      return {
        size: 'x100',
        className: `${imageClass}_default`,
      };
    }
  }
});
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

  &__file {
    @apply w-full max-w-[240px] h-[151px] flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer relative;
  }

  &__image {
    img {
      @apply object-cover rounded-[inherit];
    }

    &_default {
      @apply max-h-16 max-w-[190px];

      img {
        @apply max-h-[inherit];
      }
    }

    &_rounded {
      @apply w-16 h-16 rounded-full overflow-hidden;

      img {
        @apply w-full h-full;
      }
    }

    &_full {
      @apply w-full h-full overflow-hidden rounded-[inherit];

      img {
        @apply w-full h-full;
      }
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
}
</style>
