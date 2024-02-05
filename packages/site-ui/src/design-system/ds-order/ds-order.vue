<template>
  <ds-modal @close="emit('close')">
    <DsOrderForm
      :checkout="checkout"
      :price="price"
      :old-price="oldPrice"
      :privacy-text="privacyText"
      @send-form="sendForm"
    />
  </ds-modal>
</template>

<script setup>
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import DsOrderForm from 'site-ui/src/design-system/ds-order-form/ds-order-form.vue';
import { computed, toRaw } from 'vue';

const emit = defineEmits(['close']);

const property = defineProps({
  item: {
    type: Object,
    default: () => {},
  },

  checkout: {
    type: Object,
    default: () => {},
  },

  price: {
    type: String,
    default: '',
  },

  oldPrice: {
    type: String,
    default: '',
  },

  action: {
    type: Object,
    required: true,
  },
});

const privacyText = computed(() => {
  const rulesLink = property.checkout.terms?.rulesLink
    ? `<a class='ds-link' href="${property.checkout.terms.rulesLink}" target="_blank">правилами пользования сайтом</a>`
    : 'правилами пользования сайтом';

  const policyLink = property.checkout.terms?.policyLink
    ? `<a class='ds-link' href="${property.checkout.terms.policyLink}" target="_blank">политикой обработки персональных данных</a>`
    : 'политикой обработки персональных данных';

  return `Отправляя заявку, вы соглашаетесь с ${rulesLink} и ${policyLink}`;
});

async function sendForm(formData) {
  const data = {
    fields: formData,
    items: [
      {
        id: toRaw(property.item.id),
        count: 1,
      },
    ],
    form: {
      type: 'catalog',
      catalogId: `${property.item.catalogId}`,
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
        title: 'Заказ отправлен',
      },
    });

    emit('close');
  } else {
    notificationManager.add({
      type: 'error',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'warning-filled',
        title: 'Заказ не отправлен',
      },
    });
  }
}
</script>
