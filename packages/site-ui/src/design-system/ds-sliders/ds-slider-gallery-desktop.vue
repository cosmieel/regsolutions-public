<template>
  <swiper-container
    :loop="true"
    :lazy-preload-prev-next="2"
    :space-between="24"
    slides-per-view="auto"
    :centered-slides="true"
    :speed="500"
    class="ds-slider-gallery-desktop"
  >
    <swiper-slide
      v-for="(chank, chankIndex) in chankArray"
      :key="getKey(chankIndex)"
      class="ds-slider-gallery-desktop__slide"
    >
      <div
        class="ds-slider-gallery-desktop__wrapper"
        :class="`ds-slider-gallery-desktop__wrapper_items-${chank.length}`"
        @click="modal = true"
      >
        <div
          v-for="(image, index) in chank"
          :key="getKey(index)"
          class="ds-slider-gallery-desktop__image-wrapper"
          :class="'ds-slider-gallery-desktop__image-wrapper_item-' + (index + 1)"
        >
          <DsImage
            :path="image.url"
            :alt="image.title || `image-${chankIndex}-${index}`"
            loading="lazy"
            :size="resizeConfig.gallery.hero.desktop.code[`${chank.length}${index}`]"
            class="ds-slider-gallery-desktop__image"
            @click="emit('click', image.realIndex)"
          />
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { computed } from 'vue';

const property = defineProps({
  items: {
    type: Array,
    default: () => {},
  },
});

const emit = defineEmits(['click']);

const images = computed(() => {
  let images = [];

  for (const [index, item] of property.items.entries()) {
    images.push({
      url: item.url,
      title: item.title || '',
      realIndex: index,
    });
  }

  return images;
});

const chankArray = computed(() => {
  const chankArray = [];

  for (let index = 0; index < images.value.length; index = index + 5) {
    if (index + 5 < images.value.length) {
      chankArray.push(images.value.slice(index, index + 5));
    } else {
      chankArray.push(images.value.slice(index, images.value.length));
    }
  }

  return duplicateChank(chankArray);
});

function duplicateChank(chankArray) {
  const newChankArray = [...chankArray];
  const chanksLength = chankArray.length;

  for (let index = chanksLength; index <= 9; index = index + chanksLength) {
    newChankArray.push(...chankArray);
  }

  return newChankArray;
}

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss">
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-slider-gallery-desktop {
  & swiper-slide {
    width: 936px;
  }

  &__wrapper {
    display: grid;
    gap: 24px;
    height: 456px;
    cursor: pointer;

    &_items-1 {
      grid-template-columns: 1fr;
    }

    &_items-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &_items-3 {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);

      .ds-slider-gallery-desktop__image-wrapper_item-1 {
        grid-column: span 2;
        grid-row: span 2;
      }
    }

    &_items-4 {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);

      .ds-slider-gallery-desktop__image-wrapper_item-1 {
        grid-column: span 1;
        grid-row: span 2;
      }

      .ds-slider-gallery-desktop__image-wrapper_item-2 {
        grid-column: span 1;
        grid-row: span 2;
      }
    }

    &_items-5 {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      .ds-slider-gallery-desktop__image-wrapper_item-1 {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }

  &__image-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: $radius-m;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:active {
      cursor: grabbing;
    }

    &_type_slide {
      border-radius: $radius-s;
    }
  }
}
</style>
