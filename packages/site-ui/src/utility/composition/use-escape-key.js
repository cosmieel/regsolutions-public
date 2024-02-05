import { useEvent } from './use-event.js';

export const useEscapeKey = (action) => {
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      action?.();
    }
  };

  useEvent('keydown', handleEscapeKey);
};
