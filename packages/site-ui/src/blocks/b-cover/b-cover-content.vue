<template>
  <article :id="'block-' + block.id" class="b-cover-content">
    <ds-container :title="block.title" :backed="block.backed">
      <div
        class="b-cover-content__wrapper"
        :class="[
          { 'b-cover-content__wrapper_reverse': block.reverse },
          { 'b-cover-content__wrapper_backed-content': !block.backed },
        ]"
      >
        <div class="b-cover-content__gallery">
          <DsImage
            v-if="block.images?.length === 1"
            :path="block.images[0]"
            :alt="block.contentTitle"
            loading="lazy"
            :size="config.resize.cover.content.single"
            class="b-cover-content__image"
          />

          <ds-slider
            v-else
            type="single"
            :controls="controls"
            :items="block.images.length"
            :need-gradient="true"
            pagination="inverse"
          >
            <ds-slide v-for="(image, index) in block.images" :key="getKey(index)">
              <DsImage
                :path="image"
                :alt="block.contentTitle"
                loading="lazy"
                :size="config.resize.cover.content.slide"
                class="b-cover-content__image"
              />
            </ds-slide>
          </ds-slider>
        </div>
        <div
          ref="description"
          class="b-cover-content__description"
          :class="{
            'b-cover-content__description_backed-content': !block.backed,
          }"
        >
          <strong class="b-cover-content__content-title">
            {{ block.contentTitle }}
          </strong>
          <p
            v-if="block.text"
            ref="text"
            class="b-cover-content__text"
            :class="{ 'b-cover-content__text_gradient': needGradient }"
            @click="showModal"
          >
            {{ block.text }}
            <DsGradient v-if="needGradient" position="bottom" />
          </p>
          <div v-if="block.buttons" class="b-cover-content__button-wrapper">
            <DsButton
              v-for="(button, index) in block.buttons"
              :key="button.text"
              :color="getButtonColor(block.buttons.length, index)"
              :text="button.text"
              :url="button.url"
              :stretch="breakPoint.isMobileAll"
              size="s"
            />
          </div>
        </div>
      </div>
    </ds-container>
    <ds-modal v-if="modal" @close="modal = false">
      <div class="b-cover-content__modal">
        <strong class="b-cover-content__content-title">
          {{ block.contentTitle }}
        </strong>
        <p v-if="block.text" class="b-cover-content__text">
          {{ block.text }}
        </p>
      </div>
    </ds-modal>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import config from 'site-ui/src/configs/configs.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const breakPoint = useBreakPoint();
const maxDescriptionHeightOnDesktop = 264;
const maxTextHeightOnMobile = 120;

defineProps({
  block: {
    type: Object,
    required: true,
  },

  storageHost: {
    type: String,
    default: '',
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

.b-cover-content {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: hidden;
    border-radius: $radius-m;

    @add-mixin desktop-all {
      flex-direction: row-reverse;
      align-items: center;
      gap: 32px;
      height: 340px;
    }

    & .b-cover-content__gallery {
      border-radius: $radius-m;
      overflow: hidden;
    }

    &_reverse {
      @add-mixin desktop-all {
        flex-direction: row;
      }
    }

    &_backed-content {
      background-color: var(--bg-layout-section);
      box-shadow: $shadow-s;

      & .b-cover-content__gallery {
        border-radius: 0;
      }
    }
  }

  &__description {
    text-align: center;

    @add-mixin desktop-all {
      flex-basis: 409px;
      text-align: left;
    }

    &_backed-content {
      padding: 0 16px 16px;

      @add-mixin desktop-all {
        padding: 0;
      }
    }
  }

  &__content-title {
    display: block;
    margin-bottom: 8px;
    white-space: pre-wrap;
    @add-mixin h5;

    @add-mixin tablet-v {
      @add-mixin h4;
    }

    @add-mixin desktop-all {
      margin-bottom: 12px;
      @add-mixin h3;
    }
  }

  &__text {
    position: relative;
    overflow: hidden;
    color: var(--font-thertiary);
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
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

    @add-mixin desktop-all {
      flex-direction: row;
      gap: 12px;
      margin-top: 24px;
    }
  }

  &__gallery {
    height: 280px;
    width: 100%;

    @add-mixin tablet-v {
      height: 340px;
    }

    @add-mixin desktop-all {
      flex-basis: 456px;
      height: 100%;
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
