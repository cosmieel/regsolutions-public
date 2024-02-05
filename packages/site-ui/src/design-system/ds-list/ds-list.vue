<template>
  <ul ref="list" class="ds-list" :class="classList">
    <slot />
  </ul>
</template>

<script setup>
import { computed } from 'vue';

const property = defineProps({
  type: {
    type: String,
    default: 'vertical',
  },
});

const classList = computed(() => {
  return `ds-list_type_${property.type}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
  margin: 0;

  @add-mixin tablet-v {
    gap: 16px;
    grid-template-columns: repeat(12, 1fr);
  }

  @add-mixin desktop-all {
    gap: 24px;
    grid-template-columns: repeat(12, 1fr);
  }

  &_type {
    &_horizontal :deep(.ds-list-item) {
      grid-column: auto/span 4;

      @add-mixin tablet-v {
        grid-column: auto/span 6;
      }

      @add-mixin desktop-all {
        grid-column: auto/span 4;
      }
    }

    &_vertical :deep(.ds-list-item) {
      grid-column: auto/span 4;

      @add-mixin tablet-v {
        grid-column: auto/span 12;
      }

      @add-mixin desktop-all {
        grid-column: auto/span 12;
      }
    }
  }
}
</style>
