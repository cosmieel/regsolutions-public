<template>
  <WizardWrapper>
    <template #step-title> Загрузите логотип </template>

    <template #step-description>
      Логотип будет размещен в верхней части экрана<br />
      (в шапке сайта)
    </template>

    <template #default>
      <LogoForm />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import LogoForm from '../logo-form/logo-form.vue';

defineProps({});
</script>

<style scoped></style>
