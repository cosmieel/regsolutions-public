<template>
  <section class="step-business-wrapper">
    <WizardWrapper :need-description="false">
      <template #step-title>Какая у вас сфера бизнеса?</template>
      <template #default>
        <BusinessAreas />
      </template>
    </WizardWrapper>
  </section>
</template>

<script setup>
import WizardWrapper from '../../wizard-wrapper/wizard-wrapper.vue';
import BusinessAreas from '../business-areas/business-areas.vue';

defineProps({});
</script>

<style lang="postcss" scoped>
.step-business-wrapper {
  @apply flex items-center justify-center mx-auto my-0 w-full;
}

.step-business {
  @apply p-8;
}
</style>
