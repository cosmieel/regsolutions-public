<template>
  <div class="dropzone-image-preview">
    <div class="dropzone-image-preview__image" :class="[mediaPropsByShapeType.className]">
      <MediaImage :path="src" :size="mediaPropsByShapeType.size" alt="Изображение" />

      <UiDropzoneRemoveAction
        class="dropzone-image-preview__remove"
        @click.stop="$emit('remove')"
      />
    </div>
  </div>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import { UiDropzoneRemoveAction } from 'account-ui';
import { computed } from 'vue';

defineEmits(['remove']);

const props = defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },

  shape: {
    type: String,
    required: false,
    default: '',
  },

  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const mediaPropsByShapeType = computed(() => {
  const imageClass = 'dropzone-image-preview__image';

  switch (props.shape) {
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
        className: '',
      };
    }
  }
});
</script>

<style lang="postcss" scoped>
.dropzone-image-preview {
  @apply w-full h-full flex justify-center items-center;

  &__image {
    @apply max-h-16 max-w-[190px];

    img {
      @apply max-h-[inherit] object-cover rounded-[inherit];
    }

    &_rounded {
      @apply w-16 h-16 rounded-full overflow-hidden;

      img {
        @apply w-full h-full;
      }
    }

    &_full {
      @apply w-full h-full overflow-hidden rounded-[inherit] max-w-fit	max-h-fit;

      img {
        @apply w-full h-full;
      }
    }
  }

  &__remove {
    @apply absolute top-[-8px] right-[-8px];
  }

  &__spinner-wrapper {
    @apply absolute left-0 top-0 w-full h-full flex justify-center items-center;
  }

  &__spinner {
    @apply w-10 h-10;
  }
}
</style>
