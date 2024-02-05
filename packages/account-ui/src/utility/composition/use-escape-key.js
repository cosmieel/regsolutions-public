import { onMounted, onUnmounted } from 'vue';

export const useEscapeKey = (action) => {
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      action?.();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscapeKey);
  });
};
