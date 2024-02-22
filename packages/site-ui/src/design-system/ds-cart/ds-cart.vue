<template>
  <article class="ds-cart">
    <DsButton
      v-if="cartStorage.counter"
      theme="fab"
      icon="grocery"
      size="l"
      class="ds-cart__button"
      @click="openCart()"
    />
    <span v-if="cartStorage.counter" class="ds-cart__counter">{{ cartStorage.counter }}</span>

    <ds-modal v-if="modal" @close="modal = false">
      <DsCartList v-show="isCartList" :catalogs="catalogs" @click="clickCardList" />
      <DsOrderForm
        v-show="!isCartList"
        :checkout="checkout"
        :price="price"
        :old-price="oldPrice"
        :privacy-text="privacyText"
        :previous-tick="true"
        @send-form="sendForm"
        @show-previous="isCartList = true"
      />
    </ds-modal>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsCartList from 'site-ui/src/design-system/ds-cart/ds-cart-list.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import DsOrderForm from 'site-ui/src/design-system/ds-order-form/ds-order-form.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { ref, computed, toRaw } from 'vue';
import { mapForBackend } from './maps/map-for-backend.js';

const property = defineProps({
  cart: {
    type: Boolean,
    required: true,
  },

  catalogItems: {
    type: Array,
    default: () => [],
  },

  catalogs: {
    type: Array,
    default: () => [],
  },

  action: {
    type: Object,
    required: true,
  },

  checkout: {
    type: Object,
    default: () => {},
  },
});

const siteMode = useSiteMode();

const cartStorage = useCartStorage();
cartStorage.init(property.catalogItems);

const modal = ref(false);
const isCartList = ref(true);
const price = ref(null);
const oldPrice = ref(null);

const privacyText = computed(() => {
  const rulesLink = property.checkout.terms?.rulesLink
    ? `<a class='ds-link' href="${property.checkout.terms.rulesLink}" target="_blank">${localizer.t(
        'order.rules'
      )}</a>`
    : localizer.t('order.rules');

  const policyLink = property.checkout.terms?.policyLink
    ? `<a class='ds-link' href="${
        property.checkout.terms.policyLink
      }" target="_blank">${localizer.t('order.policy')}</a>`
    : localizer.t('order.policy');

  return localizer.t('order.privacy', {
    rules: rulesLink,
    policy: policyLink,
  });
});

function openCart() {
  if (!siteMode.isView) {
    return;
  }

  modal.value = true;
}

function clickCardList(prices) {
  price.value = prices.price;
  oldPrice.value = prices.oldPrice;
  isCartList.value = false;
}

async function sendForm(formData) {
  const data = {
    fields: formData,
    items: mapForBackend(toRaw(cartStorage.storage)),
    form: {
      type: 'cart',
    },
  };

  const response = await fetch(`${window.location.origin}/${property.action.sendForm}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    notificationManager.add({
      type: 'info',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'checkmark',
        title: localizer.t('notifier.order.success'),
      },
    });

    cartStorage.clearStorage();
    modal.value = false;
  } else {
    notificationManager.add({
      type: 'error',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'warning-filled',
        title: localizer.t('notifier.order.error'),
      },
    });
  }
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-cart {
  position: relative;

  &__counter {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    background-color: var(--manila-03);
    border-radius: 50%;
    border: 1px solid var(--basic-10);
    color: var(--font-primary-inverse);
    @add-mixin b5;
  }

  &__button {
    padding: 12px;
  }
}
</style>
