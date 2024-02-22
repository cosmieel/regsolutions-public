<template>
  <article :id="'block-' + block.id" class="b-video">
    <ds-container :title="block.title" :backed="block.backed">
      <div class="b-video__wrapper" @click="videoInit = true">
        <template v-if="!videoInit">
          <DsImage :path="videoCover" loading="lazy" class="b-video__image" />
          <button class="b-video__button" :aria-label="localizer.t('video.start')">
            <svg width="68" height="48" viewBox="0 0 68 48">
              <path
                class="b-video__button-shape"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              ></path>
              <path class="b-video__button-icon" d="M 45,24 27,14 27,34"></path>
            </svg>
          </button>
        </template>

        <iframe
          v-else
          class="b-video__iframe"
          :src="'https://www.youtube.com/embed/' + videoId + '?autoplay=1'"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { getYoutubeId } from 'site-ui/src/services/get-youtube-id/get-youtube-id.js';
import { ref, computed } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const videoId = getYoutubeId(property.block.url);

const videoInit = ref(false);

const videoCover = computed(() => {
  return property.block.cover || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-video {
  &__wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    border-radius: $radius-m;
    cursor: pointer;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  &__button {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 68px;
    height: 48px;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }

  &__button-shape {
    fill: #212121;
    fill-opacity: 0.8;
  }

  &__button-icon {
    fill: #fff;
  }

  &__button:focus {
    outline: none;
  }

  &:hover .b-video__button-shape,
  &__button:focus .b-video__button-shape {
    fill: #f00;
    fill-opacity: 1;
  }
}
</style>
