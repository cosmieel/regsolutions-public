<template>
  <article :id="'block-' + block.id" class="b-gallery-hero">
    <h1 v-if="block.title" class="b-gallery-hero__title">{{ block.title }}</h1>
    <DsSliderGalleryMobile v-if="breakPoint.isMobileAll" :items="images" @click="changeImage" />
    <DsSliderGalleryDesktop v-else :items="images" @click="changeImage" />

    <DsButton
      v-if="block.button"
      :theme="block.button.theme"
      :color="block.button.color"
      :text="block.button.text"
      :url="block.button.url"
      class="b-gallery-hero__button"
    />

    <DsModalGallery v-if="modal" :images="images" :active="activeImage" @close="modal = false" />
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsModalGallery from 'site-ui/src/design-system/ds-modal-gallery/ds-modal-gallery.vue';
import DsSliderGalleryDesktop from 'site-ui/src/design-system/ds-sliders/ds-slider-gallery-desktop.vue';
import DsSliderGalleryMobile from 'site-ui/src/design-system/ds-sliders/ds-slider-gallery-mobile.vue';
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

function changeImage(realIndex) {
  activeImage.value = realIndex;
  modal.value = true;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-gallery-hero {
  position: relative;

  &__title {
    max-width: 504px;
    padding-top: 40px;
    margin-left: 24px;
    margin-bottom: 24px;
    color: var(--font-primary);
    text-align: left;
    font-weight: 700;
    @add-mixin h4;

    @add-mixin tablet-v {
      padding-top: 40px;
      margin: 0 auto 24px;
      text-align: center;
      @add-mixin h3;
    }

    @add-mixin desktop-all {
      padding-top: 56px;
      margin: 0 auto 40px;
      text-align: center;
      @add-mixin h2;
    }
  }

  &__button {
    position: absolute;
    right: 16px;
    bottom: 48px;
    z-index: 1;

    @add-mixin desktop-all {
      right: 24px;
      bottom: 24px;
    }
  }
}
</style>
