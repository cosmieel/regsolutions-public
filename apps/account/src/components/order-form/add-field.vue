<template>
  <div class="add-field hs-dropdown [--placement:bottom] [--strategy:absolute]">
    <div class="add-field-button">
      <UiIcon name="add" :size="14" />
    </div>
    <UiDropdown class="top-4">
      <div v-for="(field, fieldIndex) in possibleFields" :key="fieldIndex" class="">
        <button type="button" class="ui-dropdown-link" @click="addField(field.type)">
          {{ field.label }}
        </button>
      </div>
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiDropdown, UiIcon } from 'account-ui';

const possibleFields = [
  {
    type: 'email',
    label: 'E-mail',
  },
  {
    type: 'tel',
    label: 'Телефон',
  },
  {
    type: 'text',
    label: 'Имя',
  },
  {
    type: 'input',
    label: 'Однострочный текст',
  },
  {
    type: 'textarea',
    label: 'Многострочный текст',
  },
  {
    type: 'offer',
    label: 'Оферта сайта',
  },
];

const emit = defineEmits(['add-field']);

const addField = (fieldType) => {
  emit('add-field', fieldType);
};
</script>

<style lang="postcss" scoped>
.add-field {
  @apply relative;
}
.add-field-button {
  @apply absolute w-[40px] h-[40px] border rounded-3xl border-gray-200 flex justify-center items-center z-10 bg-white left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer drop-shadow-sm;
}
</style>
