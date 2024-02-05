<template>
  <DraggableItem
    class="p-4"
    :need-required-menu="true"
    :is-required="props.isRequired"
    :need-rename-menu="true"
    :name="props.label"
    :need-delete-menu="true"
    @toggle-required="toggleRequired"
    @rename="renameItem"
    @delete="deleteItem"
  >
    <UiInput
      :label="props.isRequired ? `${props.label}*` : props.label"
      :is-disabled="true"
      class="input-element"
      type="text"
      :placeholder="''"
    >
    </UiInput>
  </DraggableItem>
</template>

<script setup>
import { UiInput } from 'account-ui';
import DraggableItem from './draggable-item.vue';

const props = defineProps({
  isRequired: {
    required: true,
    type: Boolean,
  },

  label: {
    required: true,
    type: String,
  },
});
const emit = defineEmits(['rename', 'delete', 'toggle-required']);

const toggleRequired = () => {
  emit('toggle-required');
};

const renameItem = (newName) => {
  emit('rename', newName);
};

const deleteItem = () => {
  emit('delete');
};
</script>
