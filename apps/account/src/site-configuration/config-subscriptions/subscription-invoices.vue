<template>
  <div
    v-for="(invoice, invoiceIndex) in props.invoices"
    :key="invoiceIndex"
    class="subscription-invoice"
    :need-divider="false"
  >
    <div class="subscription-invoice__left">
      <div class="subscription-invoice-icon">
        <UiIcon name="receipt" />
      </div>
      <div class="subscription-invoice-data">
        <div class="subscription-invoice-date">
          {{ getDateString({ rawDate: invoice.dateCreate }) }}
        </div>
        <div class="subscription-invoice-number">
          {{ `№ ${invoice.id}` }}
        </div>
      </div>
    </div>
    <div class="subscription-invoice__right">
      <div class="subscription-invoice-value">
        {{ `${invoice.price}₽` }}
      </div>
      <!-- <div class="subscription-invoice-download">
        <UiButton class="download-button" :size="'small'" :is-ghost="true" :is-outline="true">
          <UiIcon name="download" />
        </UiButton>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import {
  UiIcon,
  // UiButton,
} from 'account-ui';
import { getDateString } from './get-date-string.js';

const props = defineProps({
  invoices: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="postcss">
.subscription {
  &-invoice {
    @apply mb-2 p-4 border border-gray-200 rounded-2xl flex justify-between items-center;

    &-icon {
      @apply bg-blue-50 rounded-lg inline-flex justify-center items-center w-[46px] h-[46px] text-blue-500;
    }
    &-data {
      @apply ml-3;
    }
    &-date {
      @apply text-gray-700 text-base;
    }
    &-number {
      @apply text-gray-700 text-xs;
    }
    &-value {
      @apply text-gray-700 text-base font-medium mr-4;
    }
    &__left {
      @apply flex justify-start items-center;
    }
    &__right {
      @apply flex justify-end items-center;
    }
    &-download {
      .ui-button {
        @apply pl-2 pr-2;
      }
      svg {
        @apply w-[14px] h-[14px] text-black;
      }
    }
  }
}
</style>
