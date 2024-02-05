<template>
  <component
    :is="icon[kebabToCamel(name)]"
    :height="size"
    :width="size"
    class="ds-icon"
    :class="{ 'ds-icon_inline': inline }"
  />
</template>

<script setup>
import { kebabToCamel } from 'site-ui/src/services/kebab-to-camel/kebab-to-camel.js';
import * as icon from './icons.js';

defineProps({
  name: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    default: 24,
  },

  inline: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-icon {
  display: block;

  &_inline {
    display: inline-block;
  }
}

.ds-icon path {
  fill: currentcolor;
}
</style>
