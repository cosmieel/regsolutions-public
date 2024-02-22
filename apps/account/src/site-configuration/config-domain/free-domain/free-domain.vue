<template>
  <UiCard
    :title="FREE_DOMAIN_TITLE"
    description="Выберите имя домена на латинице и он сразу подключится к вашему сайту"
  >
    <template #ui-card-button>
      <StatusButtonGroup
        successful-status-text="Подключен"
        unsuccessful-status-text="Не подключен"
        :is-pending="isSubmitLoading"
        :is-success="domainFreeConnected"
        :is-disabled="!isDirty"
        :with-action="false"
      />
    </template>

    <FormView />
  </UiCard>
</template>

<script setup>
import StatusButtonGroup from 'account/src/components/status-button-group.vue';
import { UiCard } from 'account-ui';
import FormView from './components/form-view.vue';
import { FREE_DOMAIN_TITLE } from './constants.js';
import { useUpdateDomainFreeForm } from './form/use-update-domain-free-form.js';

const { isSubmitLoading, isDirty, domainFreeConnected } = useUpdateDomainFreeForm();
</script>
