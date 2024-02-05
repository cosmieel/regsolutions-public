<template>
  <swiper-slide class="ds-slide">
    <slot />
  </swiper-slide>
</template>

<style lang="postcss" scoped>
.ds-slide {
  height: auto;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>
