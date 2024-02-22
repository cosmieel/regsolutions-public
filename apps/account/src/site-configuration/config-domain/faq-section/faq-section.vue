<template>
  <UiCard :title="'Остались вопросы?'" :need-controls="false" :need-divider="false">
    <template #default>
      <UiAccordion :accordion-items="list" />
    </template>
  </UiCard>
</template>

<script setup>
import { UiCard, UiAccordion } from 'account-ui';
import { ref } from 'vue';
import { FAQ_LIST_ITEMS } from './constants.js';

const list = ref(FAQ_LIST_ITEMS);
</script>
