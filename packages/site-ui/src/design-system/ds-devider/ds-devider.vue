<template>
  <div class="ds-devider">
    <span class="ds-devider__divider"></span>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-devider {
  padding: 4px 0px;

  &__divider {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--border-divider);
  }
}
</style>
