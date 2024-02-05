<template>
  <WizardWrapper>
    <template #step-title> Выберите домен </template>

    <template #step-description>
      Мы разместим ваш сайт на бесплатном домене,<br />
      но вы всегда сможете его поменять
    </template>

    <template #default>
      <DomainForm />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import DomainForm from '../domain-form/domain-form.vue';

defineProps({});
</script>

<style scoped></style>
