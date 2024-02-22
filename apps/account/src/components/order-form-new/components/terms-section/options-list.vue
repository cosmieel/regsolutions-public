<template>
  <OptionsListLayout>
    <template #default>
      <TermsSettingsOption
        :terms="terms"
        @change-form="handleChange(EVENT_TYPES.TERMS_SETTINGS, $event)"
      />
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
import TermsSettingsOption from '../options/terms-settings-option.vue';

defineProps({
  terms: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['action']);

const handleChange = (type, value) => {
  emit('action', { type, value });
};
</script>
