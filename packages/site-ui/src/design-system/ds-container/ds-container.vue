<template>
  <div class="ds-container">
    <component :is="titleTag" v-if="title" class="ds-container__title">
      {{ title }}
    </component>
    <div class="ds-container__content" :class="{ 'ds-container__content_backed': backed }">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },

  titleTag: {
    type: String,
    default: 'h2',
  },

  backed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-container {
  &__title {
    margin-bottom: 24px;
    text-align: left;
    @add-mixin h4;

    @add-mixin tablet-v {
      margin-bottom: 32px;
      text-align: center;
      @add-mixin h3;
    }

    @add-mixin desktop-all {
      margin-bottom: 40px;
      text-align: center;
      @add-mixin h2;
    }
  }

  &__content {
    border-radius: $radius-m;

    &_backed {
      padding: 16px;
      box-shadow: $shadow-m;

      @add-mixin tablet-v {
        padding: 24px;
      }

      @add-mixin desktop-all {
        padding: 56px;
      }
    }
  }
}
</style>
