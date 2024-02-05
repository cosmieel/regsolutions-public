export const vClickOutside = {
  beforeMount(element, binding) {
    element.clickOutsideEvent = function (event) {
      const withinBoundaries = event.composedPath().includes(element);

      if (!withinBoundaries) {
        binding?.value();
      }
    };

    setTimeout(() => {
      document.addEventListener('click', element.clickOutsideEvent);
    }, 0);
  },
  unmounted(element) {
    document.removeEventListener('click', element.clickOutsideEvent);
  },
};
