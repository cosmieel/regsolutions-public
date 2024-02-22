<template>
  <OptionsListLayout>
    <RenameOption :name="name" @change-form="handleChange(EVENT_TYPES.RENAME, $event)" />
  </OptionsListLayout>
</template>

<script setup>
import { EVENT_TYPES } from '../options/constants.js';
import OptionsListLayout from '../options/options-list-layout.vue';
import RenameOption from '../options/rename-option.vue';

defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['action']);

const handleChange = (type, value) => {
  emit('action', { type, value });
};
</script>
