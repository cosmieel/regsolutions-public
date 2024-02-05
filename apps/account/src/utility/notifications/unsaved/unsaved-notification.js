import { notifyer } from 'account/src/instances/notifyer.js';
// import { UiButton } from 'account-ui';
// import { markRaw } from 'vue';

export const UNSAVED_NOTIFICATION_ID = 'unsaved_notification';

// eslint-disable-next-line no-unused-vars
export const callUnsavedNotification = (actionCallback) => {
  // TODO Disabled at this task - https://jira.runity.ru/browse/REGSOLUT-827
  // notifyer.info({
  //   id: UNSAVED_NOTIFICATION_ID,
  //   message: 'Есть несохраненные изменения',
  //   icon: 'history',
  //   timeOut: 0,
  //   action: {
  //     slotValue: 'Сохранить',
  //     click: actionCallback,
  //     props: {
  //       'is-ghost-white': true,
  //     },
  //     component: markRaw(UiButton),
  //   },
  // });
};

export const closeUnsavedNotification = () => {
  notifyer.remove(UNSAVED_NOTIFICATION_ID);
};
