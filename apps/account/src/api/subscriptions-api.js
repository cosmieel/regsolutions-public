import { notifyer } from 'account/src/instances/notifyer.js';
import { pay } from './cloudpayments-api.js';
import config from './config.js';
import { fetchRequest } from './fetch-request.js';

const fetchGetRequest = async (url) => {
  return await fetchRequest({
    url,
    options: {
      method: 'GET',
    },
  });
};

const fetchPatchRequest = async (url) => {
  return await fetchRequest({
    url,
    options: {
      method: 'PATCH',
    },
  });
};

const checkSubscriptionPayment = async (siteId) => {
  const url = `${config.siteApiUrl}/${siteId}/check-payment`;

  return fetchGetRequest(url);
};

const createSubscriptionRequest = async ({ siteId, planId, promo }) => {
  const url = `${config.siteApiUrl}/${siteId}/subscribe`;
  const parameters = { planId, promo };
  let response;

  // eslint-disable-next-line no-useless-catch
  try {
    response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
  } catch (error) {
    throw error;
  }

  if (response.ok) {
    return await response.json();
  }

  throw await response.json();
};

export const api = {
  getSiteSubscription: async (siteId) => {
    const url = `${config.siteApiUrl}/${siteId}/subscription`;

    return fetchGetRequest(url);
  },

  getSiteInvoices: async (siteId) => {
    const url = `${config.siteApiUrl}/${siteId}/invoices`;

    return fetchGetRequest(url);
  },

  getSubscriptionPlans: async () => {
    const url = `${config.siteApiUrl}/subscription/plans`;

    return fetchGetRequest(url);
  },

  cancelProlongation: async (siteId) => {
    const url = `${config.siteApiUrl}/${siteId}/unsubscribe`;

    return fetchPatchRequest(url);
  },

  createSubscription: async ({ siteId, planId, promo }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const paymentData = await createSubscriptionRequest({ siteId, planId, promo });

      if (!paymentData?.subscription?.isInfinity) {
        const { publicId, description, amount, currency, invoiceId, accountId, CloudPayments } =
          paymentData;

        const { CustomerReceipt: receipt, recurrent } = CloudPayments;

        await pay({
          receipt,
          recurrent,
          params: {
            publicId,
            description,
            amount,
            currency,
            invoiceId,
            accountId,
          },
        });

        await checkSubscriptionPayment(siteId);
      }

      return true;
    } catch (error) {
      if (error?.code === 'CouponValidationError') {
        notifyer.error({ message: 'Невалидный купон' });
      }

      throw error;
    }
  },
};
