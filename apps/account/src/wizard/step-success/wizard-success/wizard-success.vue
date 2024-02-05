<template>
  <div class="wizard-success">
    <router-link :to="{ name: 'accountMain' }">
      <UiButton class="wizard-success__button">
        <span class="font-medium">Продолжить</span>
        <UiIcon name="chevron-m-right" :size="14" />
      </UiButton>
    </router-link>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWizardStore } from '../../stores/wizard-store.js';

const router = useRouter();

const wizardStore = useWizardStore();

onMounted(() => {
  if (!wizardStore.isCompleted) {
    router.replace({ name: 'accountMain' });
  }
});

onUnmounted(() => {
  if (wizardStore.isCompleted) {
    wizardStore.$reset();
  }
});
</script>

<style lang="postcss" scoped>
.wizard-success {
  &__button {
    @apply flex items-center justify-center space-x-1 w-auto mx-auto;
  }
}
</style>
