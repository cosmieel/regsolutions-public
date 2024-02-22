export const vClickOutside = {
  beforeMount(element, binding) {
    element.clickOutsideEvent = function (event) {
      if (
        !(element === event.target || element.contains(event.target)) &&
        !binding.value?.exclude?.contains(event.target)
      ) {
        binding.value?.handler(event, element);
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent);
  },
  unmounted(element) {
    document.body.removeEventListener('click', element.clickOutsideEvent);
  },
};
