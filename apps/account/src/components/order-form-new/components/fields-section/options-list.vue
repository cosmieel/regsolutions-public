<template>
  <OptionsListLayout>
    <template #default>
      <RequiredOption :value="isRequired" @click="handleChange(EVENT_TYPES.REQUIRED, undefined)" />
      <RenameOption :name="name" @change-form="handleChange(EVENT_TYPES.RENAME, $event)" />
    </template>

    <template #afterDivider>
      <RemoveOption @click="handleChange(EVENT_TYPES.REMOVE, undefined)" />
    </template>
  </OptionsListLayout>
</template>

<script setup>
import { EVENT_TYPES } from '../options/constants.js';
import OptionsListLayout from '../options/options-list-layout.vue';
import RemoveOption from '../options/remove-option.vue';
import RenameOption from '../options/rename-option.vue';
import RequiredOption from '../options/required-option.vue';

defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },

  isRequired: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['action']);

const handleChange = (type, value) => {
  emit('action', { type, value });
};
</script>
