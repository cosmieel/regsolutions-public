<template>
  <section :class="`ds-packer ds-packer_type_${type}`">
    <Suspense>
      <slot />
    </Suspense>
  </section>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'content',
  },
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-packer {
  &_type {
    &_hero {
      width: 100%;
      padding-bottom: 32px;

      @add-mixin tablet-v {
        padding-bottom: 40px;
      }

      @add-mixin desktop-all {
        padding-bottom: 52px;
      }
    }

    &_content {
      padding: 32px 16px;

      @add-mixin tablet-v {
        padding: 40px 24px;
      }

      @add-mixin desktop-all {
        padding: 52px calc((100% - 936px) / 2);
      }
    }
  }
}
</style>
