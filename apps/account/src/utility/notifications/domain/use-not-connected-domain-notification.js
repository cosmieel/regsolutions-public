import { watch, onUnmounted } from 'vue';
import {
  callNotConnectedDomainNotification,
  closeNotConnectedDomainNotification,
} from './not-connected-domain-notification.js';

const handleClose = () => {
  closeNotConnectedDomainNotification();
};

export const useNotConnectedDomainNotification = (watchValue) => {
  watch(
    watchValue,
    (value) => {
      if (value) {
        callNotConnectedDomainNotification(value);
      } else {
        handleClose();
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    handleClose();
  });
};
