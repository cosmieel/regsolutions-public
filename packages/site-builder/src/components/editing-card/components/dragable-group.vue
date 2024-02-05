<template>
  <DraggableContainer class="dragable-group" ghost-class="dragable-group__element" :list="list">
    <slot />
  </DraggableContainer>
</template>

<script setup>
import { VueDraggableNext as DraggableContainer } from 'vue-draggable-next';

defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="postcss">
.dragable-group {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;

  &__element {
    outline: 1px solid var(--blue-500, #4f7fff);
  }
}

.element {
  outline: 2px solid var(--blue-500, #4f7fff);
}
</style>
