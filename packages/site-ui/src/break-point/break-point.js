/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore, setActivePinia, createPinia } from 'pinia';
import { ref } from 'vue';

setActivePinia(createPinia());

export const useBreakPoint = defineStore('break-point', () => {
  const maxMobileBreak = 1024;
  const body = document.body;
  const isMobileAll = ref('');
  const state = ref('');
  const screenWidth = ref(window.innerWidth);
  const callbackStackResize = [];

  const getState = (contentWidth) => {
    if (contentWidth <= 620) {
      return 'mobile';
    } else if (contentWidth <= 1024) {
      return 'tablet-v';
    } else if (contentWidth <= 1200) {
      return 'tablet-h';
    } else {
      return 'desktop';
    }
  };

  const init = () => {
    BreakPointObserver.observe(body);
  };

  const BreakPointObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const contentWidth = entry.contentBoxSize[0]
        ? entry.contentBoxSize[0].inlineSize
        : entry.contentRect.width;

      isMobileAll.value = contentWidth <= maxMobileBreak ? true : false;
      state.value = getState(contentWidth);

      if (screenWidth.value === contentWidth) {
        return;
      }

      screenWidth.value = contentWidth;

      if (callbackStackResize.length > 0) {
        for (const callback of callbackStackResize) {
          callback();
        }
      }
    }
  });

  const onResize = (callback) => {
    if (typeof callback === 'function') {
      callbackStackResize.push(callback);
    }
  };

  const destroy = (callback) => {
    if (callbackStackResize.includes(callback)) {
      const index = callbackStackResize.indexOf(callback);

      callbackStackResize.splice(index, 1);
    }
  };

  return {
    isMobileAll,
    state,
    screenWidth,
    init,
    onResize,
    destroy,
  };
});
