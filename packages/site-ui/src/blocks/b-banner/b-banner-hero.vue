<template>
  <article :id="'block-' + block.id" class="b-banner-hero">
    <div
      v-if="block.banners.length <= 1"
      class="b-banner-hero__content"
      :style="getStyle(block.banners[0].image)"
    >
      <div class="b-banner-hero__content-wrapper">
        <h1 class="b-banner-hero__title">{{ block.banners[0].title }}</h1>
        <p v-if="block.banners[0].text" class="b-banner-hero__text">{{ block.banners[0].text }}</p>
        <div v-if="block.banners[0].buttons" class="b-banner-hero__buttons-wrapper">
          <DsButton
            v-for="(button, index) in block.banners[0].buttons"
            :key="button.text"
            :color="getButtonColor(block.banners[0].buttons.length, index)"
            :text="button.text"
            :url="button.url"
            :stretch="breakPoint.isMobileAll"
          />
        </div>
      </div>
    </div>

    <ds-slider
      v-else
      :items="block.banners.length"
      type="single"
      :controls="controls"
      pagination="inverse"
    >
      <ds-slide v-for="(banner, index) in block.banners" :key="getKey(index)">
        <div class="b-banner-hero__content" :style="getStyle(banner.image)">
          <div class="b-banner-hero__content-wrapper">
            <h1 v-if="index === 0" class="b-banner-hero__title">{{ banner.title }}</h1>
            <strong v-else class="b-banner-hero__title">{{ banner.title }}</strong>
            <p v-if="banner.text" class="b-banner-hero__text">{{ banner.text }}</p>
            <div v-if="banner.buttons" class="b-banner-hero__buttons-wrapper">
              <DsButton
                v-for="(button, indexButton) in banner.buttons"
                :key="button.text"
                :color="getButtonColor(banner.buttons.length, indexButton)"
                :text="button.text"
                :url="button.url"
                :stretch="breakPoint.isMobileAll"
              />
            </div>
          </div>
        </div>
      </ds-slide>
    </ds-slider>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { getConstructedUrl } from 'site-ui/src/services/get-constructed-url/get-constructed-url.js';
import { computed, inject } from 'vue';

const breakPoint = useBreakPoint();

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { hosts } = inject(OPTIONS_KEY);

const controls = computed(() => {
  return breakPoint.isMobileAll ? '' : 'secondary-inverse';
});

function getStyle(img) {
  const constructedUrl = getConstructedUrl(img, hosts, resizeConfig.banner.hero);

  return `background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), center/cover url('${constructedUrl}');`;
}

function getButtonColor(length, index) {
  return length === 2 && index === 1 ? 'primary-inverse' : 'secondary-inverse';
}

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-banner-hero {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 192px 24px;

    @add-mixin tablet-v {
      padding: 228px 0;
    }

    @add-mixin desktop-all {
      padding: 292px 0;
    }
  }

  &__content-wrapper {
    width: 100%;
    text-align: center;

    @add-mixin tablet-v {
      max-width: 525px;
    }

    @add-mixin desktop-all {
      max-width: 663px;
    }
  }

  &__title {
    display: block;
    margin-bottom: 8px;
    color: var(--font-primary-inverse);
    font-weight: 700;
    white-space: pre-line;
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
    margin: auto;
    color: var(--font-secondary-inverse);
    font-weight: 400;
    white-space: pre-line;
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__buttons-wrapper {
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
      justify-content: center;
      gap: 12px;
      margin-top: 32px;
    }
  }
}
</style>
