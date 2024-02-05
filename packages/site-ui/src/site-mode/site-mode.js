/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSiteMode = defineStore('site-mode', () => {
  const validValues = new Set(['view', 'edit', 'preview']);
  const mode = ref('view');

  const isEdit = computed(() => {
    return mode.value === 'edit';
  });

  const isView = computed(() => {
    return mode.value === 'view';
  });

  const isPreview = computed(() => {
    return mode.value === 'preview';
  });

  function changeMode(newMode) {
    if (!validValues.has(newMode)) {
      console.error(`Режима ${newMode} не существует`);

      return;
    }

    mode.value = newMode;
  }

  return {
    isEdit,
    isView,
    isPreview,
    changeMode,
  };
});
