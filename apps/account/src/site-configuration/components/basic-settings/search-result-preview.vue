<template>
  <div class="settings-basic-preview">
    <div class="settings-basic-preview__note">Превью в поисковой выдаче</div>

    <div class="settings-basic-preview__card">
      <div class="settings-basic-preview__head">
        <div class="settings-basic-preview__image">
          <MediaImage
            v-if="path"
            :path="path"
            :size="config.resize.previewView.previewSearchResult"
            :alt="`${name ? `${name} ` : ''}лого`"
          />
          <UiSvg v-else name="image" class="w-6 h-full mx-auto" />
        </div>
        <div class="settings-basic-preview__link">
          http://{{ domain }}{{ slug ? `/${slug}` : '' }}
        </div>
      </div>
      <div v-if="name" class="settings-basic-preview__name">
        {{ name }}
      </div>
      <div v-if="description" class="settings-basic-preview__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { UiSvg } from 'account-ui';

defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },

  description: {
    type: String,
    required: false,
    default: '',
  },

  path: {
    type: String,
    required: true,
    default: '',
  },

  domain: {
    type: String,
    required: true,
    default: '',
  },

  slug: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
.settings-basic-preview {
  @apply flex flex-col gap-2;

  &__note {
    @apply text-sm text-gray-400 leading-4;
  }

  &__card {
    @apply p-6 rounded-lg border border-gray-200 text-sm leading-6 text-gray-700;
  }

  &__head {
    @apply flex items-center pb-4;
  }

  &__image {
    @apply w-8 h-8 rounded-full overflow-hidden flex-none bg-gray-50;

    img {
      @apply w-full h-full object-cover;
    }
  }

  &__link {
    @apply pl-2 truncate;
  }

  &__name {
    @apply text-lg leading-6 font-medium pb-2 break-words;
  }

  &__description {
    @apply break-words;
  }
}
</style>
