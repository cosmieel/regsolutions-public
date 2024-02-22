<template>
  <div class="paid-domain-form-view">
    <div class="paid-domain-form-view__row">
      <FormUiDomainInput
        class="paid-domain-form-view__input"
        :name="PAID_DOMAIN_KEY"
        placeholder="Домен"
        :is-success="!isDirty && hasDomain"
        @keyup.enter="formState.handleEnterSubmit"
      />
      <UiButton
        v-if="isDirty"
        is-outline
        :pending="isSubmitLoading"
        :disabled="isStatusLoading || isSubmitLoading"
        class="paid-domain-form-view__check"
        @click="formState.handleSave()"
      >
        <UiIcon name="checkmark" :size="16" />
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import FormUiDomainInput from 'account/src/components/form/form-ui-domain-input.vue';
import { UiButton, UiIcon } from 'account-ui';
import { computed, inject } from 'vue';
import { PAID_DOMAIN_KEY, PAID_DOMAIN_STATE_KEY } from '../form/constants.js';

const formState = inject(PAID_DOMAIN_STATE_KEY);

const isDirty = computed(() => formState.isDirty.value);
const hasDomain = computed(() => formState.hasDomain.value);
const isSubmitLoading = computed(() => formState.isSubmitLoading.value);
const isStatusLoading = computed(() => formState.isStatusLoading.value);
</script>

<style lang="postcss" scoped>
.paid-domain-form-view {
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
