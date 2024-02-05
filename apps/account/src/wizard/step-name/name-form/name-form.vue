<template>
  <form class="name-form" @submit.prevent>
    <div class="name-form__input-wrapper">
      <UiInput
        v-model.trim.lazy="name"
        class="name-form__input"
        :type="'text'"
        :placeholder="'Мой сайт'"
        :max-length="'100'"
        @keyup.enter="submitName"
      />
    </div>
    <UiButton @click="submitName">Дальше</UiButton>
  </form>
</template>

<script setup>
import { UiButton, UiInput } from 'account-ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useWizardStore } from '../../stores/wizard-store.js';

const router = useRouter();

const wizardStore = useWizardStore();
const { name } = storeToRefs(wizardStore);

const submitName = async () => {
  if (!name.value) {
    name.value = 'Мой сайт';
  }

  router.push({ name: 'wizardStepDomain' });
};
</script>

<style lang="postcss" scoped>
.name-form {
  &__input-wrapper {
    @apply relative mb-10;
  }
}
</style>

TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP
TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP TitleSHOP AAaaaaAAA
AAAA AAAA AAA
