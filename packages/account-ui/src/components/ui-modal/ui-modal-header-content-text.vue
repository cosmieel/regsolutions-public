<template>
  <div v-if="hasTitleSlot || hasDescriptionSlot">
    <div v-if="hasTitleSlot" class="modal-header-content-text__title">
      <slot name="title" />
    </div>
    <div v-if="hasDescriptionSlot" class="modal-header-content-text__description">
      <slot name="description" />
    </div>
  </div>
</template>

<script setup>
import { useSlots, computed } from 'vue';

const slots = useSlots();

const hasTitleSlot = computed(() => !!slots.title);
const hasDescriptionSlot = computed(() => !!slots.description);
</script>

<style lang="postcss" scoped>
.modal-header-content-text {
  &__title {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 8px;
    word-break: break-all;
    color: var(--gray-700, var(--colors-gray-700, #374151));
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    word-break: break-all;
    color: var(--gray-500, #6b7280);
  }
}
</style>
