<template>
  <WizardWrapper>
    <template #step-title> Опишите свой продукт </template>

    <template #step-description>
      Расскажите покупателям подробно о своем продукте – это повысит их заинтересованность
    </template>

    <template #default>
      <DescriptionForm />
    </template>
  </WizardWrapper>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import DescriptionForm from '../description-form/description-form.vue';
</script>
