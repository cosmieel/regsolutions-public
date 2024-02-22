<template>
  <UiCard class="paid-domain-card" :title="PAID_DOMAIN_TITLE" need-description-slot>
    <template #ui-card-button>
      <StatusButtonGroup
        v-if="hasDomain"
        successful-status-text="Подключен"
        unsuccessful-status-text="Не подключен"
        :is-pending="isStatusLoading"
        :is-success="isDomainConfigured"
        :is-disabled="isDirty"
        @action="handleUpdateStatus"
      />
    </template>

    <template #ui-card-description>
      <DescriptionContent />
    </template>

    <UiSpinnerFull v-if="isFetching" class="paid-domain-card__spinner" />

    <FormView />
    <HowToSetup v-if="hasDomain && !isDomainConfigured" />
  </UiCard>
</template>

<script setup>
import StatusButtonGroup from 'account/src/components/status-button-group.vue';
import { UiCard, UiSpinnerFull } from 'account-ui';
import DescriptionContent from './components/description-content.vue';
import FormView from './components/form-view.vue';
import HowToSetup from './components/how-to-setup.vue';
import { PAID_DOMAIN_TITLE } from './constants.js';
import { useUpdateDomainPaidForm } from './form/use-update-domain-paid-form.js';

const { handleUpdateStatus, isStatusLoading, hasDomain, isDomainConfigured, isFetching, isDirty } =
  useUpdateDomainPaidForm();
</script>

<style lang="postcss" scoped>
.paid-domain-card {
  position: relative;

  &__spinner {
    z-index: 100;
  }
}
</style>
