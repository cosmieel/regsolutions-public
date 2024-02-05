<template>
  <section v-if="isLoading">Загрузка...</section>
  <section v-else-if="isError">Произошла ошибка: {{ error }}</section>
  <section v-else-if="currentSite" class="config-domain">
    <UiCard
      :title="'Бесплатный домен'"
      :description="'Выберите имя домена на латинице и он сразу подключится к вашему сайту'"
    >
      <template #ui-card-button>
        <StatusButtonGroup
          :successful-status-text="'Подключен'"
          :unsuccessful-status-text="'Не подключен'"
          :is-success="isFreeDomainConfigured"
          :is-pending="updateDomainPending"
          @click="onUpdateFreeDomain"
        />
      </template>
      <template #default>
        <FreeDomain
          v-model:domain="freeDomain"
          :domain-error-message="freeDomainErrorMessage"
          :is-domain-valid="isFreeDomainValid"
          :is-pending="updateDomainPending"
          @lookup-domain="onUpdateFreeDomain"
        />
      </template>
    </UiCard>

    <UiCard :title="'Свой домен'" need-description-slot>
      <template #ui-card-button>
        <StatusButtonGroup
          v-if="isPaidDomainValid"
          :successful-status-text="'Подключен'"
          :unsuccessful-status-text="'Не подключен'"
          :is-success="isPaidDomainConfigured"
          :is-pending="lookupDomainPending"
          @click="onLookupPaidDomain"
        />
      </template>
      <template #ui-card-description>
        Подключите свой домен. Если у вас его еще нет – найти подходящий можно в
        <a
          class="config-domain__link"
          href="https://www.reg.ru/domain/new/"
          target="_blank"
          rel="noreferrer noopener"
          >магазине доменов</a
        >
      </template>
      <template #default>
        <PaidDomain
          v-model:domain="paidDomain"
          :is-domain-valid="isPaidDomainValid"
          :is-domain-configured="isPaidDomainConfigured"
          :domain-error-message="paidDomainErrorMessage"
          :domain-initial="domainInitial"
          :is-pending="lookupDomainPending"
          @lookup-domain="onLookupPaidDomain"
          @change-domain="onChangeDomain"
        />
      </template>
    </UiCard>

    <!--    TODO: Срыто в этой задаче https://jira.runity.ru/browse/REGSOLUT-716-->
    <!--    <UiCard :title="'Остались вопросы?'" :need-controls="false" :need-divider="false">-->
    <!--      <template #default>-->
    <!--        <UiAccordion :accordion-items="domainFaq" />-->
    <!--      </template>-->
    <!--    </UiCard>-->
  </section>
</template>

<script setup>
import { UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import FreeDomain from './free-domain.vue';
import PaidDomain from './paid-domain.vue';
import StatusButtonGroup from '../../components/status-button-group.vue';
import { useDomainConfigurationStore } from '../stores/domain-configuration-store.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, isLoading, isError, error } = storeToRefs(siteConfigurationStore);

const domainConfigurationStore = useDomainConfigurationStore();
const {
  freeDomain,
  isFreeDomainConfigured,
  isFreeDomainValid,
  freeDomainErrorMessage,
  paidDomain,
  paidDomainErrorMessage,
  isPaidDomainValid,
  isPaidDomainConfigured,
  domainInitial,
} = storeToRefs(domainConfigurationStore);

const updateDomainPending = ref(false);
const lookupDomainPending = ref(false);

const onUpdateFreeDomain = async () => {
  updateDomainPending.value = true;
  await domainConfigurationStore.updateFreeDomain();
  updateDomainPending.value = false;
};
const onLookupPaidDomain = async () => {
  lookupDomainPending.value = true;
  await domainConfigurationStore.lookupPaidDomainRequest();
  lookupDomainPending.value = false;
};

const onChangeDomain = () => {
  isPaidDomainValid.value = false;
};

// const domainFaqData = [
//   {
//     id: 1,
//     title: 'Accordion Item',
//     description: 'Accordion Item Description',
//   },
//   {
//     id: 2,
//     title: 'Accordion Item',
//     description: 'Accordion Item Description',
//   },
//   {
//     id: 3,
//     title: 'Accordion Item',
//     description: 'Accordion Item Description',
//   },
//   {
//     id: 4,
//     title: 'Accordion Item',
//     description: 'Accordion Item Description',
//   },
// ];
// const domainFaq = ref(domainFaqData);
</script>

<style lang="postcss" scoped>
.config-domain {
  @apply space-y-6;

  &__link {
    @apply text-inherit leading-[inherit] decoration-1 underline underline-offset-2;

    &:hover {
      @apply text-blue-600;
    }

    &:focus,
    &:active {
      @apply text-blue-600 no-underline;
    }
  }

  &__paid-domain-status {
    @apply text-xs font-medium text-gray-500 px-2.5 py-2 bg-gray-100 whitespace-nowrap pointer-events-none rounded;
  }
}
</style>
