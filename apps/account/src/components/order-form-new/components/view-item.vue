<template>
  <div
    class="order-form-view-item"
    :class="{ 'order-form-view-item_draggable': isDraggable }"
    ghost-class="order-form-view-item_ghost"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  isDraggable: {
    type: Boolean,
    required: false,
  },
});
</script>

<style lang="postcss" scoped>
.order-form-view-item {
  @apply ml-[-16px] mr-[-16px] border border-transparent rounded-2xl relative bg-white p-4;

  &_draggable {
    @apply cursor-grab;

    &:active {
      @apply cursor-grabbing;
    }
  }

  &_ghost {
    @apply opacity-30;
  }

  &:hover {
    @apply border-gray-200;

    :deep(.order-form-three-dot-menu) {
      @apply visible;
    }
  }
}
</style>
