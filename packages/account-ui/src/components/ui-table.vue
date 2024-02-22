<template>
  <div class="ui-table">
    <div class="ui-table__container">
      <table class="ui-table__table">
        <thead class="ui-table__head">
          <slot name="ui-table-head"></slot>
        </thead>
        <tbody class="ui-table__body">
          <DraggableContainer
            v-if="isDraggable"
            :list="list"
            class="ui-table__dragable-group"
            ghost-class="ui-table__dragable-element"
            :animation="150"
            @change="handleChangeOrder"
          >
            <slot name="ui-table-body"></slot>
          </DraggableContainer>
          <slot v-else name="ui-table-body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { VueDraggableNext as DraggableContainer } from 'vue-draggable-next';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change-order']);

const handleChangeOrder = () => emit('change-order');

const isDraggable = computed(() => props.list.length > 1);
</script>

<style lang="postcss" scoped>
.ui-table {
  &__container {
    @apply border border-gray-200 rounded-lg;
  }

  &__table {
    @apply divide-y divide-gray-200 w-full;
  }

  &__head {
    @apply w-full;

    :slotted(th) {
      @apply bg-gray-50;

      &:first-of-type {
        @apply rounded-tl-lg;
      }
      &:last-of-type {
        @apply rounded-tr-lg;
      }
    }
  }

  &__dragable-group {
    @apply divide-y divide-gray-200 cursor-grab;

    &:active {
      @apply cursor-grabbing;
    }

    :deep(.sortable-chosen) {
      @apply rounded-lg;
    }
  }

  :deep(&__dragable-element) {
    @apply outline outline-2 outline-blue-500 rounded-lg bg-blue-50;

    & > * {
      @apply opacity-0;
    }
  }
}
</style>
