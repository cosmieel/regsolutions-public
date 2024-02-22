import { notifyer } from 'account/src/instances/notifyer.js';
import { router } from 'account/src/router/router';
import { UiButton } from 'account-ui';
import { markRaw } from 'vue';

export const NOT_CONNECTED_NOTIFICATION_ID = 'not_connected_notification_id';

export const callNotConnectedDomainNotification = (message) => {
  notifyer.error({
    id: NOT_CONNECTED_NOTIFICATION_ID,
    message,
    icon: 'warning-filled',
    timeOut: 0,
    action: {
      slotValue: 'Настроить',
      click: () => {
        router.push({ name: 'siteConfigurationDomain' });
      },
      props: {
        'is-ghost-white': true,
      },
      component: markRaw(UiButton),
    },
  });
};

export const closeNotConnectedDomainNotification = () => {
  notifyer.remove(NOT_CONNECTED_NOTIFICATION_ID);
};
