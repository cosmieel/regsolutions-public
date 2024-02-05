<template>
  <DraggableItem
    class="p-4 mt-6"
    :need-rename-menu="true"
    :name="props.label"
    :is-not-draggable="true"
    @rename="renameItem"
  >
    <UiButton>
      {{ props.label }}
    </UiButton>
  </DraggableItem>
</template>

<script setup>
import { UiButton } from 'account-ui';
import DraggableItem from './draggable-item.vue';

const props = defineProps({
  label: {
    required: true,
    type: String,
  },
});

const emit = defineEmits(['rename']);

const renameItem = (newName) => {
  emit('rename', newName);
};
</script>
