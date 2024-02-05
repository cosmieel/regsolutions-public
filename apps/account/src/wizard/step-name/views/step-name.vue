<template>
  <WizardWrapper>
    <template #step-title>Назовите ваш сайт</template>

    <template #step-description>
      Вы всегда сможете поменять название сайта
    </template>

    <template #default>
      <NameForm />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import NameForm from '../name-form/name-form.vue';

defineProps({});
</script>

<style scoped></style>
