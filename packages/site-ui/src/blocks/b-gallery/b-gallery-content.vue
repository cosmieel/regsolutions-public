<template>
  <article :id="'block-' + block.id" class="b-gallery-content">
    <ds-container :title="block.title" :backed="block.backed">
      <div v-if="breakPoint.isMobileAll" class="b-gallery-content__slider-wrapper">
        <ds-slider :items="images.length" pagination="primary" type="multiple">
          <ds-slide v-for="(image, index) in images" :key="getKey(index)">
            <DsImage
              :path="image.url"
              :alt="'image-' + (index + 1)"
              loading="lazy"
              :size="config.resize.gallery.content.slide"
              class="b-gallery-content__image b-gallery-content__image_type_slide"
              @click="changeImage(index)"
            />
          </ds-slide>
        </ds-slider>
      </div>

      <div v-else class="b-gallery-content__wrapper" :class="classWrapper" @click="modal = true">
        <template v-for="(image, index) in images" :key="getKey(index)">
          <div
            v-if="index <= 4"
            class="b-gallery-content__image-wrapper"
            :class="'b-gallery-content__image-wrapper_item-' + (index + 1)"
          >
            <DsImage
              :path="image.url"
              :alt="'image-' + (index + 1)"
              loading="lazy"
              :size="config.resize.gallery.content.item"
              class="b-gallery-content__image"
            />
            <template v-if="index === 4 && images.length > 5">
              <span class="b-gallery-content__layer" />
              <span class="b-gallery-content__counter"> +{{ images.length - 5 }} </span>
            </template>
          </div>
        </template>
      </div>
    </ds-container>
    <DsModalGallery v-if="modal" :images="images" :active="activeImage" @close="modal = false" />
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import config from 'site-ui/src/configs/configs.js';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import DsModalGallery from 'site-ui/src/design-system/ds-modal-gallery/ds-modal-gallery.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { ref, computed } from 'vue';

const breakPoint = useBreakPoint();

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  storageHost: {
    type: String,
    default: '',
  },
});

const modal = ref(false);
const activeImage = ref(0);

const images = computed(() => {
  return property.block.images.map((image) => {
    return {
      url: image.url,
      title: image.title,
    };
  });
});

const classWrapper = computed(() => {
  return images.value.length < 5
    ? `b-gallery-content__wrapper_items-${images.value.length}`
    : 'b-gallery-content__wrapper_items-5';
});

function getKey(index) {
  return `${index}${Math.random()}`;
}

function changeImage(realIndex) {
  activeImage.value = realIndex;
  modal.value = true;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-gallery-content {
  &__slider-wrapper {
    height: 376px;
    cursor: pointer;
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

      .b-gallery-content__image-wrapper_item-1 {
        grid-column: span 2;
        grid-row: span 2;
      }
    }

    &_items-4 {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);

      .b-gallery-content__image-wrapper_item-1 {
        grid-column: span 1;
        grid-row: span 2;
      }

      .b-gallery-content__image-wrapper_item-2 {
        grid-column: span 1;
        grid-row: span 2;
      }
    }

    &_items-5 {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      .b-gallery-content__image-wrapper_item-1 {
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

    &_type_slide {
      border-radius: $radius-m;
    }
  }

  &__layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.4;
  }

  &__counter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--font-primary-inverse);
    font-weight: 400;
    @add-mixin b1;
  }
}
</style>
