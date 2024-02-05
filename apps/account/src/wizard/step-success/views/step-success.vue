<template>
  <WizardWrapper>
    <template #step-title>
      <span class="step-success__title">Ура!</span>
    </template>

    <template #step-description>
      <span class="step-success__description">
        Вы заполнили основную информацию,<br />
        теперь перейдем в конструктор
      </span>
    </template>

    <template #default>
      <WizardSuccess />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import WizardSuccess from '../wizard-success/wizard-success.vue';

defineProps({});
</script>

<style lang="postcss" scoped>
.step-success {
  &__title {
    @apply text-2xl leading-none font-bold;
  }

  &__description {
    @apply text-base;
  }
}
</style>
