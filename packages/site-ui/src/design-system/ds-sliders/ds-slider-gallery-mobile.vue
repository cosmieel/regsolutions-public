<template>
  <swiper-container
    ref="slider"
    :loop="true"
    :lazy-preload-prev-next="2"
    :space-between="24"
    :slides-per-view="1.2"
    :speed="300"
    :breakpoints="{
      621: {
        slidesPerView: 2.2,
      },
    }"
    :pagination="{
      dynamicBullets: true,
    }"
    :init="false"
    class="ds-slider-gallery-mobile"
  >
    <swiper-slide
      v-for="(item, index) in items"
      :key="getKey(index)"
      class="ds-slider-gallery-mobile__slide"
    >
      <DsImage
        :path="item.url"
        :alt="'image-' + (index + 1)"
        loading="lazy"
        :size="resizeConfig.gallery.hero.mobile"
        class="ds-slider-gallery-mobile__image ds-slider-gallery-mobile__image_type_slide"
        @click="emit('click', index)"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { getPaginationStyle } from 'site-ui/src/design-system/ds-slider/get-pagination-style';
import { ref, onMounted } from 'vue';

defineProps({
  items: {
    type: Array,
    default: () => {},
  },
});

const emit = defineEmits(['click']);

const slider = ref(null);

onMounted(() => {
  const paginationStyle = getPaginationStyle('primary');
  const sliderStyle = [`.swiper { padding-bottom: 36px; overflow: visible;}`, ...paginationStyle];

  Object.assign(slider.value, { injectStyles: sliderStyle });

  slider.value.initialize();
});

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss">
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-slider-gallery-mobile {
  &__slide {
    height: 456px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &_type_slide {
      border-radius: $radius-m;
    }
  }
}
</style>
