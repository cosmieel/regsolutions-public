<template>
  <div class="wizard-main">
    <section class="wizard-main__wrapper">
      <div class="wizard-main__inner">
        <router-view />
      </div>
    </section>
    <section class="wizard-main__demo">
      <WizardDemo />
    </section>

    <div class="wizard-main__exit" title="Отменить создание сайта">
      <WizardExit />
    </div>
  </div>
</template>

<script setup>
import WizardDemo from '../wizard-demo/wizard-demo.vue';
import WizardExit from '../wizard-exit/wizard-exit.vue';
</script>

<style lang="postcss" scoped>
.wizard-main {
  @apply flex mx-auto my-0 w-full max-w-[1200px] relative;

  &__wrapper {
    @apply flex items-center justify-center w-full max-w-[661px] p-8;
  }

  &__inner {
    @apply w-full max-w-[373px];
  }

  &__demo {
    @apply w-full max-w-[539px] p-10 flex items-center justify-center;
  }

  &__exit {
    @apply fixed right-[24px] top-[10px];
  }
}
</style>
