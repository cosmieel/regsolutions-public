<template>
  <span class="ds-gradient" :class="gradientClass" />
</template>

<script setup>
import { computed } from 'vue';

const property = defineProps({
  type: {
    type: String,
    default: 'default',
  },

  position: {
    type: String,
    default: 'right',
  },
});

const gradientClass = computed(() => {
  if (property.type === 'default') {
    return `ds-gradient_position_${property.position}`;
  }

  return `ds-gradient_type_${property.type}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-gradient {
  display: block;
  position: absolute;

  &_position {
    &_top {
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: linear-gradient(0deg, rgb(255 255 255 / 0%) 0%, var(--bg-layout-section) 100%);
    }

    &_right {
      top: 0;
      right: 0;
      width: 44px;
      height: 100%;
      background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, var(--bg-layout-section) 100%);
    }

    &_bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, var(--bg-layout-section) 100%);
    }

    &_left {
      top: 0;
      left: 0;
      width: 44px;
      height: 100%;
      background: linear-gradient(270deg, rgb(255 255 255 / 0%) 0%, var(--bg-layout-section) 100%);
    }
  }

  &_type {
    &_substrate {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      background: linear-gradient(180deg, rgba(43, 45, 51, 0) 0%, rgba(43, 45, 51, 0.2) 98.44%);
      z-index: 1;

      @add-mixin desktop-all {
        height: 108px;
      }
    }
  }
}
</style>
