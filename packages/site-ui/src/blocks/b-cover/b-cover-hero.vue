<template>
  <article
    :id="'block-' + block.id"
    class="b-cover-hero"
    :class="{ 'b-cover-hero_backed-content': block.backed }"
  >
    <div
      class="b-cover-hero__wrapper"
      :class="[
        { 'b-cover-hero__wrapper_reverse': block.reverse },
        { 'b-cover-hero__wrapper_backed-content': block.backed },
      ]"
    >
      <div class="b-cover-hero__gallery">
        <DsImage
          v-if="block.images?.length === 1"
          :path="block.images[0]"
          :alt="block.contentTitle"
          :size="resizeConfig.cover.hero.single"
          class="b-cover-hero__image"
        />
        <ds-slider
          v-else
          :items="block.images.length"
          type="single"
          :controls="controls"
          :need-gradient="true"
          pagination="inverse"
        >
          <ds-slide v-for="(image, index) in block.images" :key="getKey(index)">
            <DsImage
              :path="image"
              :alt="block.contentTitle"
              loading="lazy"
              :size="resizeConfig.cover.hero.slide"
              class="b-cover-hero__image"
            />
          </ds-slide>
        </ds-slider>
      </div>
      <div
        ref="description"
        class="b-cover-hero__description"
        :class="{
          'b-cover-hero__description_backed-content': block.backed,
        }"
      >
        <h1 class="b-cover-hero__content-title">
          {{ block.contentTitle }}
        </h1>
        <p
          v-if="block.text"
          ref="text"
          class="b-cover-hero__text"
          :class="{ 'b-cover-hero__text_gradient': needGradient }"
          @click="showModal"
        >
          {{ block.text }}
          <DsGradient v-if="needGradient" position="bottom" />
        </p>
        <div v-if="block.buttons" class="b-cover-hero__button-wrapper">
          <DsButton
            v-for="(button, index) in block.buttons"
            :key="button.text"
            :color="getButtonColor(block.buttons.length, index)"
            :text="button.text"
            :url="button.url"
            :stretch="breakPoint.isMobileAll"
          />
        </div>
      </div>
    </div>
    <ds-modal v-if="modal" @close="modal = false">
      <div class="b-cover-hero__modal">
        <strong class="b-cover-hero__content-title">
          {{ block.contentTitle }}
        </strong>
        <p v-if="block.text" class="b-cover-hero__text">
          {{ block.text }}
        </p>
      </div>
    </ds-modal>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const breakPoint = useBreakPoint();
const maxDescriptionHeightOnDesktop = 520;
const maxTextHeightOnMobile = 160;

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  if (text.value) {
    changeTextHeight();
    breakPoint.onResize(changeTextHeight);
  }
});

onUnmounted(() => {
  breakPoint.destroy(changeTextHeight);
});

const text = ref(null);
const description = ref(null);
const needGradient = ref(false);
const modal = ref(false);

const controls = computed(() => {
  return breakPoint.isMobileAll ? '' : 'secondary';
});

function changeTextHeight() {
  text.value.removeAttribute('style');
  needGradient.value = false;

  const textHeight = text.value.clientHeight;
  const descriptionHeight = description.value.clientHeight;

  if (breakPoint.isMobileAll && textHeight > maxTextHeightOnMobile) {
    addTextHeight(maxTextHeightOnMobile);
    needGradient.value = true;
  }

  if (!breakPoint.isMobileAll && descriptionHeight > maxDescriptionHeightOnDesktop) {
    const maxTextHeight = maxDescriptionHeightOnDesktop - (descriptionHeight - textHeight);
    addTextHeight(maxTextHeight);
    needGradient.value = true;
  }
}

function addTextHeight(height) {
  text.value.style.height = `${height}px`;
}

function showModal() {
  if (needGradient.value) {
    modal.value = true;
  }
}

function getButtonColor(length, index) {
  return length === 2 && index === 1 ? 'secondary' : 'primary';
}

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-cover-hero {
  &_backed-content {
    background-color: var(--bg-layout-section);
    box-shadow: $shadow-s;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 1440px;
    margin: auto;
    overflow: hidden;

    @add-mixin tablet-v {
      gap: 24px;
      padding: 24px 24px 0;
    }

    @add-mixin desktop-all {
      flex-direction: row-reverse;
      align-items: center;
      gap: 80px;
      height: 560px;
      padding: 40px 80px 0;
    }

    @add-mixin tablet-h {
      gap: 24px;
      height: 576px;
      padding: 56px 56px 0;
    }

    &_backed-content {
      @add-mixin tablet-v {
        padding: 24px;
      }

      @add-mixin desktop-all {
        height: 600px;
        padding: 40px 80px;
      }

      @add-mixin tablet-h {
        height: 632px;
        padding: 56px;
      }
    }

    &_reverse {
      @add-mixin desktop-all {
        flex-direction: row;
      }
    }
  }

  &__description {
    padding: 0 16px;

    @add-mixin tablet-v {
      padding: 0;
      text-align: center;
    }

    @add-mixin desktop-all {
      flex-basis: 572px;
      padding: 0;
    }

    &_backed-content {
      padding: 0 16px 16px;

      @add-mixin tablet-v {
        padding: 0;
      }

      @add-mixin desktop-all {
        padding: 0;
      }
    }
  }

  &__content-title {
    display: block;
    margin-bottom: 8px;
    color: var(--font-primary);
    white-space: pre-wrap;
    @add-mixin h4;

    @add-mixin tablet-v {
      margin-bottom: 12px;
      @add-mixin h3;
    }

    @add-mixin desktop-all {
      margin-bottom: 16px;
      @add-mixin h1;
    }
  }

  &__text {
    position: relative;
    overflow: hidden;
    color: var(--font-primary);
    white-space: pre-wrap;
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }

    &_gradient {
      cursor: pointer;
    }
  }

  &__button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 16px;

    @add-mixin tablet-v {
      margin-top: 24px;
    }

    @add-mixin desktop-all {
      flex-direction: row;
      gap: 12px;
      margin-top: 24px;
    }
  }

  &__gallery {
    height: 280px;
    width: 100%;
    overflow: hidden;

    @add-mixin tablet-v {
      height: 520px;
      border-radius: $radius-m;
    }

    @add-mixin desktop-all {
      flex-basis: 628px;
      height: 100%;
      border-radius: $radius-m;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__modal {
    padding: 32px;
  }
}
</style>
