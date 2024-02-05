import { onMounted, onUnmounted } from 'vue';

export const useEvent = (eventName, action) => {
  onMounted(() => {
    window.addEventListener(eventName, action);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, action);
  });
};
