<template>
  <form class="description-form">
    <div class="description-form__textarea-wrapper">
      <UiTextarea
        v-model.trim="description"
        :label="'Описание'"
        :placeholder="'Расскажите о своем продукте...'"
        :counter="'2000'"
      />
    </div>
    <UiButton :disabled="isCreateSitePending" :pending="isCreateSitePending" @click="createSite">
      Готово
    </UiButton>
  </form>
</template>

<script setup>
import { UiButton, UiTextarea } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useWizardStore } from '../../stores/wizard-store.js';

const wizardStore = useWizardStore();
const { description } = storeToRefs(wizardStore);

const isCreateSitePending = ref(false);

const createSite = async () => {
  isCreateSitePending.value = true;
  await wizardStore.createSiteRequest();
  isCreateSitePending.value = false;
};
</script>

<style lang="postcss" scoped>
.description-form {
  &__textarea-wrapper {
    @apply relative mb-20;
  }
}
</style>
