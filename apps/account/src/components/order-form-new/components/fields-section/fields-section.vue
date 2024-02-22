<template>
  <DraggableContainer :list="fields">
    <component
      :is="components[fieldsMap[item.type]]"
      v-for="item in fields"
      :key="item.name"
      :label="item.label"
      :is-required="item.required"
      @option-action="handleOptionsAction(item.name, $event)"
    />
  </DraggableContainer>
</template>

<script setup>
import { inject } from 'vue';
import { VueDraggableNext as DraggableContainer } from 'vue-draggable-next';
import InputField from './input-field.vue';
import InputTextArea from './input-textarea.vue';
import { FIELD_TYPES, FIELDS_STATE_KEY } from '../../constants.js';

const { fields, handleOptionsAction } = inject(FIELDS_STATE_KEY);

const components = {
  [FIELD_TYPES.INPUT]: InputField,
  [FIELD_TYPES.TEXTAREA]: InputTextArea,
};

const fieldsMap = {
  [FIELD_TYPES.TEXT]: FIELD_TYPES.INPUT,
  [FIELD_TYPES.EMAIL]: FIELD_TYPES.INPUT,
  [FIELD_TYPES.TEL]: FIELD_TYPES.INPUT,
  [FIELD_TYPES.INPUT]: FIELD_TYPES.INPUT,
  [FIELD_TYPES.TEXTAREA]: FIELD_TYPES.TEXTAREA,
};
</script>
