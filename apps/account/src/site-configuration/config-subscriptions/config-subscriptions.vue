<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-subscriptions">
    <UiCard
      :need-divider="false"
      :need-header="hasSubscription"
      :is-loading="isCreateSubscriptionLoading"
    >
      <template #default>
        <SubscriptionPlan
          :is-infinite="siteSubscription.subscriptionIsInfinity"
          :site-subscription="modifiedSubscription"
          :subscription-plans="subscriptionPlans.items"
          :is-cancel-prolongation-loading="isCancelProlongationLoading"
          @create-subscription-click="onCreateSubscriptionClick"
          @cancel-prolongation-click="onCancelPrologationClick"
        />
      </template>
      <template #ui-card-button>
        <UiBadge v-if="!siteSubscription?.subscriptionIsInfinity">{{
          `Действует до ${expirationDateString}`
        }}</UiBadge>
        <UiBadge v-if="currentSite.domain">{{ currentSite.domain }}</UiBadge>
      </template>
    </UiCard>
    <UiCard v-if="siteInvoices.length > 0" :title="'Счета'" :need-divider="false">
      <!-- <template #ui-card-button>
        <UiButton class="download-button" :size="'small'" :is-ghost="true" :is-outline="true">
          <span>Скачать все</span>
          <UiIcon name="download" />
        </UiButton>
      </template> -->
      <template #default>
        <SubscriptionInvoices :invoices="siteInvoices" />
      </template>
    </UiCard>
  </section>

  <teleport to="#user-account-alerts-wrapper">
    <UiError
      v-if="cancelProlongationErrorMessage"
      :error-text="cancelProlongationErrorMessage"
      @close="closeCancelProlongationErrorMessage"
    />
  </teleport>
</template>

<script setup>
import {
  UiBadge,
  UiCard,
  UiError,
  // UiButton,
  // UiIcon,
} from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { getDateString } from './get-date-string.js';
import SubscriptionInvoices from './subscription-invoices.vue';
import SubscriptionPlan from './subscription-plan.vue';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';
import { useSubscriptionsConfigurationStore } from '../stores/subscriptions-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isLoading, isError, error } = storeToRefs(siteConfigurationStore);

const subscriptionsConfigurationStore = useSubscriptionsConfigurationStore();
const {
  siteSubscription,
  subscriptionPlans,
  cancelProlongationErrorMessage,
  siteInvoices,
  isCreateSubscriptionLoading,
  isCancelProlongationLoading,
} = storeToRefs(subscriptionsConfigurationStore);

const expirationDateString = computed(() => {
  if (!siteSubscription.value.subscriptionDateExpire) {
    return '';
  }

  return getDateString({
    rawDate: siteSubscription.value.subscriptionDateExpire,
    isYearCropped: true,
  });
});

const hasSubscription = computed(() => {
  return Object.keys(siteSubscription.value).length > 0;
});

const modifiedSubscription = computed(() => {
  if (!hasSubscription.value) {
    return {};
  }

  return {
    price: siteSubscription.value.subscriptionPrice,
    period: siteSubscription.value.subscriptionPeriod,
    description: siteSubscription.value.planDescription,
    features: siteSubscription.value.planFeatures,
    active: siteSubscription.value.active,
    id: siteSubscription.value.planId,
  };
});

const onCreateSubscriptionClick = (data) => {
  subscriptionsConfigurationStore.createSubscription(data.planId, data.promoCode);
};

const onCancelPrologationClick = () => {
  subscriptionsConfigurationStore.cancelProlongation();
};

const closeCancelProlongationErrorMessage = () => {
  subscriptionsConfigurationStore.clearCancelProlongationError();
};
</script>

<style lang="postcss" scoped>
.config-subscriptions {
  @apply space-y-6;
  .download-button {
    svg {
      @apply ml-2 w-[14px] h-[14px] text-black;
    }
  }
}
</style>
