import { notifyer } from 'account/src/instances/notifyer';
import { UiButton } from 'account-ui';
import { markRaw } from 'vue';

export const CATALOG_DELETION_NOTIFICATION_ID = 'catalog_deletion_notification_id';

export const callSuccessCatalogDeletionNotification = (name, onTimerCompleted, onCancel) => {
  notifyer.info({
    message: name ? `Каталог “${name}” был удалён` : 'Каталоги были удалены',
    timeOut: 10_000,
    onTimerCompleted,
    meta: {
      id: CATALOG_DELETION_NOTIFICATION_ID,
    },
    action: {
      slotValue: 'Отменить',
      props: {
        'is-ghost-white': true,
      },
      click: onCancel,
      component: markRaw(UiButton),
    },
  });
};
