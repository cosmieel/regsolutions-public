import { useQueryClient } from '@tanstack/vue-query';
import { notifyer } from 'account/src/instances/notifyer';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCancelProlongationMutation } from '../composables/cancel-prolongation-mutation.js';
import { useCreateSubscriptionMutation } from '../composables/create-subscription-mutation.js';
import { getSiteInvoicesById } from '../composables/site-invoices.js';
import { getSiteSubscriptionById } from '../composables/site-subscription.js';
import { getSubscriptionPlans } from '../composables/subscription-plans.js';

export const useSubscriptionsConfigurationStore = defineStore(
  'subscriptionsConfigurationStore',
  () => {
    const queryClient = useQueryClient();
    const route = useRoute();
    const queryCache = queryClient.getQueryCache();

    const currentSiteId = ref(route.params.siteId);

    const siteSubscription = ref({});
    const subscriptionPlans = ref([]);
    const siteInvoices = ref([]);

    const cancelProlongationMutation = useCancelProlongationMutation();
    const createSubscriptionMutation = useCreateSubscriptionMutation();

    const isCreateSubscriptionLoading = ref(false);
    const isCancelProlongationLoading = ref(false);

    const cancelProlongationErrorMessage = ref('');

    async function fetchSiteSubscription() {
      try {
        const fetchedSiteSubscription = await queryClient.fetchQuery({
          queryKey: ['site-subscription', currentSiteId.value],
          queryFn: async () => await getSiteSubscriptionById(currentSiteId.value),
        });

        siteSubscription.value = fetchedSiteSubscription;
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchSubscriptionPlans() {
      try {
        const dataFromCache = queryCache.queriesMap[`["subscription-plans"]`]?.state?.data;

        if (dataFromCache) {
          subscriptionPlans.value = dataFromCache;

          return;
        }

        const fetchedSubscriptionPlans = await queryClient.fetchQuery({
          queryKey: ['subscription-plans'],
          queryFn: async () => await getSubscriptionPlans(),
        });

        subscriptionPlans.value = fetchedSubscriptionPlans;
      } catch (error) {
        console.log(error);
      }
    }

    async function createSubscription(planId, promoCode) {
      try {
        isCreateSubscriptionLoading.value = true;

        await createSubscriptionMutation.mutateAsync({
          siteId: currentSiteId.value,
          planId,
          promo: promoCode || undefined,
        });

        if (createSubscriptionMutation.isSuccess.value) {
          notifyer.success({
            message: 'Подписка успешно оформлена',
          });

          await fetchSiteSubscription();
        }
      } catch (error) {
        console.error(error);
      } finally {
        isCreateSubscriptionLoading.value = false;
      }
    }

    async function cancelProlongation() {
      isCancelProlongationLoading.value = true;
      clearCancelProlongationError();

      try {
        await cancelProlongationMutation.mutateAsync(currentSiteId.value);

        if (cancelProlongationMutation.isSuccess.value) {
          fetchSiteSubscription();
        }
      } catch (error) {
        cancelProlongationErrorMessage.value = error.message;
      } finally {
        isCancelProlongationLoading.value = false;
      }
    }

    function clearCancelProlongationError() {
      cancelProlongationErrorMessage.value = '';
    }

    async function fetchInvoices() {
      try {
        const fetchedInvocies = await queryClient.fetchQuery({
          queryKey: ['site-invoices', currentSiteId.value],
          queryFn: async () => await getSiteInvoicesById(currentSiteId.value),
        });

        siteInvoices.value = fetchedInvocies.items;
      } catch (error) {
        console.log(error);
      }
    }

    watch(
      () => route.params.siteId,
      async (siteId) => {
        if (siteId) {
          currentSiteId.value = siteId;
          await fetchSiteSubscription();
          await fetchSubscriptionPlans();
          await fetchInvoices();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      siteSubscription,
      subscriptionPlans,
      fetchSiteSubscription,
      createSubscription,
      cancelProlongation,
      clearCancelProlongationError,
      cancelProlongationErrorMessage,
      siteInvoices,
      isCreateSubscriptionLoading,
      isCancelProlongationLoading,
    };
  }
);
