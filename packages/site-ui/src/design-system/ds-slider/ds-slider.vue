<template>
  <article class="ds-slider" :class="sliderClass">
    <swiper-container
      ref="slider"
      :lazy-preload-prev-next="2"
      :speed="speed"
      class="ds-slider__swiper"
      :init="false"
    >
      <DsGradient
        v-if="needGradient"
        slot="container-end"
        type="substrate"
        class="ds-slider__gradient"
      />
      <slot />
    </swiper-container>
    <template v-if="controls">
      <DsControl
        ref="previous"
        class="ds-slider__control ds-slider__control_orientation_left"
        :color="controls"
        @click="goToPrevious"
      />
      <DsControl
        ref="next"
        class="ds-slider__control ds-slider__control_orientation_right"
        :color="controls"
        type="right"
        @click="goToNext"
      />
    </template>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsControl from 'site-ui/src/design-system/ds-control/ds-control.vue';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import { ref, computed, onUpdated, onMounted, onBeforeUnmount } from 'vue';
import { getParameters } from './get-parameters.js';

const breakPoint = useBreakPoint();

const emit = defineEmits(['change']);

const property = defineProps({
  type: {
    type: String,
    default: 'multiple',
  },

  items: {
    type: Number,
    default: 0,
  },

  slideActive: {
    type: Number,
    default: 0,
  },

  controls: {
    type: String,
    default: '',
  },

  pagination: {
    type: String,
    default: '',
  },

  needGradient: {
    type: Boolean,
    default: false,
  },

  keyboardControl: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slider = ref(null);

onUpdated(() => {
  slider.value.swiper.loopDestroy();
  slider.value.swiper.loopCreate();
  slider.value.swiper.update();
});

onMounted(() => {
  const sliderParameters = {
    ...getParameters(property.type, property.items, property.pagination),
    keyboard: {
      enabled: property.keyboardControl,
    },
  };

  Object.assign(slider.value, sliderParameters);

  slider.value.initialize();

  if (property.slideActive) {
    slider.value.swiper.params.loop
      ? slider.value.swiper.slideToLoop(property.slideActive)
      : slider.value.swiper.slideTo(property.slideActive);

    emit('change', slider.value.swiper.realIndex);

    slider.value.swiper.loopDestroy();
    slider.value.swiper.loopCreate();
    slider.value.swiper.update();
  }

  slider.value.swiper.on('slideChange', () => {
    if (slider.value.swiper) {
      emit('change', slider.value.swiper.realIndex);
    }
  });
});

onBeforeUnmount(() => {
  slider.value.swiper.destroy();
});

const sliderClass = computed(() => {
  return `ds-slider_type_${property.type}`;
});

const speed = computed(() => {
  return breakPoint.isMobileAll ? 300 : 500;
});

function goToPrevious() {
  slider.value.swiper.slidePrev(speed.value);
}

function goToNext() {
  slider.value.swiper.slideNext(speed.value);
}

defineExpose({
  goToPrevious,
  goToNext,
});
</script>

<style lang="postcss">
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-slider {
  position: relative;
  width: 100%;
  height: 100%;

  &_type {
    &_single {
      & .ds-slider__control {
        top: 50%;
        translate: 0 -50%;

        &_orientation {
          &_left {
            left: 8px;
          }

          &_right {
            right: 8px;
          }
        }
      }
    }

    &_multiple {
      & .ds-slider__swiper {
        @add-mixin desktop-all {
          overflow: hidden;
        }
      }

      & .ds-slider__control {
        top: calc(50% - 18px);
        translate: 0 -50%;

        &.ds-slider__control_orientation_left {
          left: -20px;
        }
        &.ds-slider__control_orientation_right {
          right: -20px;
        }
      }
    }

    &_multiple-shadow {
      margin-top: -12px;

      & .ds-slider__swiper {
        margin-left: -12px;
        margin-right: -12px;

        @add-mixin desktop-all {
          overflow: hidden;
        }
      }

      & .ds-slider__control {
        top: calc(50% - 12px);
        translate: 0 -50%;

        &.ds-slider__control_orientation_left {
          left: -20px;
        }
        &.ds-slider__control_orientation_right {
          right: -20px;
        }
      }
    }
  }

  &__swiper {
    height: 100%;
  }

  &__gradient {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
