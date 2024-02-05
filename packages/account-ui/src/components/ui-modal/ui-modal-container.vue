<template>
  <component :is="tag" class="modal-content">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});
</script>

<style lang="postcss" scoped>
.modal-content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  max-height: calc(100vh - 160px);
  border-radius: 16px;
  z-index: 99;
  overflow: hidden;
  background-color: var(--white-white, #fff);
  box-shadow: 1px 4px 20px 0px rgba(46, 64, 100, 0.16), 2px 2px 12px 0px rgba(46, 64, 100, 0.04);
}
</style>
