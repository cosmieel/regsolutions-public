<template>
  <div class="subscription-plan__cost">
    <span class="subscription-plan__cost-value">{{
      !isInfinite ? `${shownSubscriptionPlanObject.price} ₽` : 'Бесконечная подписка'
    }}</span>
    <span v-if="!isInfinite" class="subscription-plan__cost-per-month">{{
      `/ ${displayedPeriod} мес`
    }}</span>
  </div>
  <p class="subscription-plan__description">
    {{ shownSubscriptionPlanObject.description }}
  </p>
  <div v-if="!shownSubscriptionPlanObject.active" class="subscription-plan__selector">
    <div class="subscription-plan__selector-bg">
      <nav class="flex space-x-2">
        <a
          v-for="(plan, planIndex) in subscriptionPlans"
          :key="plan.id"
          :class="{ active: planIndex === selectedPlanIndex }"
          href="#"
          @click="setSelectedPlan(planIndex)"
        >
          {{ plan.name }}
        </a>
      </nav>
    </div>
  </div>
  <ul class="subscription-plan__checklist">
    <li
      v-for="(item, itemIndex) in shownSubscriptionPlanObject.features"
      :key="itemIndex"
      class="subscription-plan__checklist-item"
    >
      <UiIcon name="circle-checkmark" :size="20" />
      <span class="text-gray-800 dark:text-gray-400">
        {{ item }}
      </span>
    </li>
  </ul>
  <div v-if="!siteSubscription?.active">
    <PromoCodeInput v-model="promoCodeValue" />
  </div>
  <div class="subscription-plan__buttons">
    <UiButton v-if="showProlongationButton" class="mb-4" @click="onCreateSubscriptionClick">
      Продлить тариф
    </UiButton>
    <UiButton v-if="showApplyButton" class="mb-4" @click="onCreateSubscriptionClick">
      Подключить тариф
    </UiButton>
    <UiButton
      v-if="showCancelProlongationButton"
      class="ui-button_cancel"
      :disabled="isCancelProlongationLoading"
      @click="onCancelPrologationClick"
    >
      Отключить автопродление
    </UiButton>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { ref, computed, watchEffect } from 'vue';
import PromoCodeInput from './promo-code-input.vue';

const props = defineProps({
  siteSubscription: {
    type: Object,
    default: () => {},
  },

  subscriptionPlans: {
    type: Array,
    default: () => [],
  },

  isCancelProlongationLoading: {
    type: Boolean,
    default: false,
  },

  isInfinite: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const promoCodeValue = ref('');

const emit = defineEmits(['cancel-prolongation-click', 'create-subscription-click']);

const selectedPlanIndex = ref(-1);

const hasSubscription = computed(() => {
  return Object.keys(props.siteSubscription).length > 0;
});

const shownSubscriptionPlanObject = computed(() => {
  if (hasSubscription.value && isSelectedPlanHasCurrentPlanId.value) {
    return props.siteSubscription;
  }

  return props.subscriptionPlans[selectedPlanIndex.value] || {};
});

const showProlongationButton = computed(() => {
  if (!hasSubscription.value) {
    return false;
  }

  return !props.siteSubscription.active && isSelectedPlanHasCurrentPlanId.value;
});

const showCancelProlongationButton = computed(() => {
  if (!hasSubscription.value) {
    return false;
  }

  return shownSubscriptionPlanObject.value.active;
});

const showApplyButton = computed(() => {
  if (shownSubscriptionPlanObject.value.active) {
    return false;
  }

  if (!hasSubscription.value || !isSelectedPlanHasCurrentPlanId.value) {
    return true;
  }

  return false;
});

const isReadyToSetSelectedPlan = computed(() => {
  return props.subscriptionPlans.length > 0;
});

const isSelectedPlanHasCurrentPlanId = computed(() => {
  if (!hasSubscription.value) {
    return false;
  }

  if (props.subscriptionPlans.length === 0) {
    return false;
  }

  return props.subscriptionPlans[selectedPlanIndex.value]?.id === props.siteSubscription.id;
});

const selectedSubscriptionPlan = computed(() => {
  return props.subscriptionPlans[selectedPlanIndex.value];
});

const displayedPeriod = computed(() => {
  let period = shownSubscriptionPlanObject.value.period;

  if (period === 1) {
    return '';
  }

  return period;
});

const setSelectedPlan = (planIndex) => {
  selectedPlanIndex.value = planIndex;
};

const findSubscriptionPlanIndexById = (id) => {
  return props.subscriptionPlans.findIndex((element) => element.id === id);
};

const onCancelPrologationClick = () => {
  emit('cancel-prolongation-click');
};

const onCreateSubscriptionClick = () => {
  emit('create-subscription-click', {
    planId: selectedSubscriptionPlan.value.id,
    promoCode: promoCodeValue.value,
  });
};

watchEffect(() => {
  if (!isReadyToSetSelectedPlan.value) {
    return;
  }

  let planId = 0;

  if (hasSubscription.value) {
    planId = findSubscriptionPlanIndexById(props.siteSubscription.id);
  }

  setSelectedPlan(planId);
});
</script>

<style lang="postcss" scoped>
.subscription-plan {
  &__cost {
    @apply mb-4;
    &-value {
      @apply text-3xl font-bold;
    }
    &-per-month {
      @apply text-gray-500 text-base;
    }
  }
  &__description {
    @apply text-sm text-gray-400;
    @apply mb-8;
  }
  &__checklist {
    @apply space-y-3 text-sm mb-8;
    &-item {
      @apply flex items-center space-x-2;
    }
    svg {
      @apply flex-shrink-0 text-blue-700 m-1;
    }
  }
  &__selector {
    @apply flex mb-8;
    &-bg {
      @apply flex bg-gray-50 hover:bg-gray-100 rounded-lg transition p-1;
    }
    a {
      @apply py-2 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-700 hover:text-gray-700 font-medium rounded-lg;
      &.active,
      &:hover {
        @apply bg-white shadow-sm;
      }
    }
  }

  &__buttons {
    @apply mt-4;
  }
}
</style>
