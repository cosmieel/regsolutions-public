<template>
  <a class="ds-logo" href="/">
    <DsImage :path="url" :alt="alt" class="ds-logo__image" :size="resizeConfig.logo" />
  </a>
</template>

<script setup>
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';

defineProps({
  url: {
    type: String,
    required: true,
  },

  alt: {
    type: String,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-logo {
  display: flex;
  flex-shrink: 0;
  height: 56px;
  max-width: 164px;

  @add-mixin desktop-all {
    max-width: 200px;
  }

  &__image {
    object-fit: contain;
    object-position: left;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
