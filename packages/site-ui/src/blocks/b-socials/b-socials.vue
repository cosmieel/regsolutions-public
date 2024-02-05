<template>
  <article :id="'block-' + block.id" class="b-socials">
    <ds-container :title="block.title" :backed="block.backed">
      <div v-if="block.socials.length > 0" class="b-socials__wrapper" :class="classWrapper">
        <DsSocial
          v-for="social in block.socials"
          :key="`${social.icon + social.url}`"
          :social="social"
        />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsSocial from 'site-ui/src/design-system/ds-social/ds-social.vue';
import { computed } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const classWrapper = computed(() => {
  return property.block.socials.length < 4
    ? `b-socials__wrapper_col-${property.block.socials.length}`
    : '';
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-socials {
  &__wrapper {
    display: grid;
    gap: 16px;

    @add-mixin desktop-all {
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    &_col-1 {
      @add-mixin desktop-all {
        grid-template-columns: 1fr;
      }
    }

    &_col-2 {
      @add-mixin desktop-all {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &_col-3 {
      @add-mixin desktop-all {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
</style>
