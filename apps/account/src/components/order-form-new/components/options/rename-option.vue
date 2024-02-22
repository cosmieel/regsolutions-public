<template>
  <NestedMenu
    ref="menuReference"
    trigger-icon="edit"
    trigger-label="Переименовать"
    @close="handleReset"
  >
    <RenameForm ref="renameFormReference" :name="name" @change="handleChangeForm" />
  </NestedMenu>
</template>

<script setup>
import { ref } from 'vue';
import RenameForm from '../forms/rename-form/rename-form.vue';
import NestedMenu from '../menu/nested-menu.vue';

defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['change-form']);

const menuReference = ref(null);
const renameFormReference = ref(null);

const handleReset = () => {
  renameFormReference.value?.handleReset();
};

const handleChangeForm = (value) => {
  emit('change-form', value);

  menuReference.value?.handleClose?.();
};
</script>
