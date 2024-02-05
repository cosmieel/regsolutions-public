<template>
  <article :id="'block-' + block.id" class="b-text">
    <ds-container :title="block.title" :backed="block.backed">
      <p class="b-text__text">{{ block.text }}</p>
      <div v-if="block.button && block.button.text" class="b-text__buttons-wrapper">
        <DsButton
          :key="block.button.text"
          color="secondary"
          :text="block.button.text"
          :url="block.button.url"
          :stretch="breakPoint.isMobileAll"
        />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const breakPoint = useBreakPoint();
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-text {
  &__text {
    color: var(--font-thertiary);
    white-space: pre-wrap;
    @add-mixin b3;

    @add-mixin tablet-v {
      text-align: center;
    }

    @add-mixin desktop-all {
      text-align: center;
      @add-mixin b2;
    }
  }

  &__buttons-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-top: 24px;

    @add-mixin desktop-all {
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
