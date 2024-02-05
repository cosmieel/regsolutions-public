import { watch, onUnmounted } from 'vue';
import { callUnsavedNotification, closeUnsavedNotification } from './unsaved-notification.js';

export const useUnsavedNotification = (watchValue, action) => {
  watch(watchValue, (value) => {
    if (value) {
      callUnsavedNotification(action);
    } else {
      closeUnsavedNotification();
    }
  });

  onUnmounted(() => {
    closeUnsavedNotification();
  });
};
