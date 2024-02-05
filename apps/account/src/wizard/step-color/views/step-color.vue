<template>
  <WizardWrapper>
    <template #step-title> Выберите цвет </template>

    <template #step-description>
      Выберите цвет кнопок и других акцентов<br />
      на сайте из предложеных вариантов<br />
      или выберите из палитры
    </template>

    <template #default>
      <ColorSelector />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import ColorSelector from '../color-selector/color-selector.vue';

defineProps({});
</script>

<style scoped></style>
