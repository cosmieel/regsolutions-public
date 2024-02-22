<template>
  <div class="free-domain-form-view">
    <div class="free-domain-form-view__row">
      <FormDomainInput
        class="free-domain-form-view__input"
        :name="FREE_DOMAIN_KEY"
        @keyup.enter="formState.handleSave()"
      />
      <UiButton
        v-if="isDirty"
        is-outline
        :pending="isSubmitLoading"
        :disabled="isSubmitLoading"
        class="free-domain-form-view__check"
        @click="formState.handleSave()"
      >
        <UiIcon name="checkmark" :size="16" />
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import FormDomainInput from 'account/src/components/form/form-domain-input.vue';
import { UiButton, UiIcon } from 'account-ui';
import { inject } from 'vue';
import { FREE_DOMAIN_KEY, FREE_DOMAIN_STATE_KEY } from '../form/constants.js';

const formState = inject(FREE_DOMAIN_STATE_KEY);

const isDirty = formState.isDirty;
const isSubmitLoading = formState.isSubmitLoading;
</script>

<style lang="postcss" scoped>
.free-domain-form-view {
  @apply flex flex-col gap-[24px];

  &__row {
    @apply flex items-start gap-2 w-full;
  }

  &__input {
    @apply w-full;
  }

  &__check {
    @apply w-10 h-10 flex-none;

    svg {
      @apply flex-none;
    }
  }
}
</style>
