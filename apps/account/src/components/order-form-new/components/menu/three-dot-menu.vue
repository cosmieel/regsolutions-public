<template>
  <div
    ref="menuReference"
    class="order-form-three-dot-menu hs-dropdown absolute [--placement:bottom]"
    :class="{ 'order-form-three-dot-menu_fixed': fixedPosition }"
  >
    <button
      class="hs-dropdown-toggle order-form-three-dot-menu__toggle"
      @click="handleSetFixedPosition(true)"
    >
      <UiIcon name="more-vertical" :size="14" />
    </button>
    <UiDropdown class="order-form-three-dot-menu__dropdown">
      <slot />
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiIcon, UiDropdown } from 'account-ui';
import { onMounted, ref } from 'vue';

const menuReference = ref(null);
const fixedPosition = ref(false);

const handleSetFixedPosition = (value) => {
  if (value !== fixedPosition.value) {
    fixedPosition.value = value;
  }
};

const handleResetFixedPosition = () => {
  handleSetFixedPosition(false);
};

const handleClose = () => {
  if (menuReference.value) {
    window.HSDropdown.close(menuReference.value);
    handleResetFixedPosition();
  }
};

onMounted(() => {
  if (menuReference.value) {
    menuReference.value.addEventListener('close.hs.dropdown', handleResetFixedPosition);
  }
});

defineExpose({
  handleClose,
});
</script>

<style lang="postcss" scoped>
.order-form-three-dot-menu {
  @apply w-8 h-8 invisible border border-gray-200 flex items-center justify-center cursor-pointer left-[-16px] top-[-16px] bg-white rounded-2xl shadow-sm z-[1];

  &_fixed {
    @apply visible;
  }

  &__toggle {
    @apply outline-none border-0 w-full h-full flex justify-center items-center z-10;
  }

  &_dropdown {
    @apply top-4 divide-y divide-gray-100;
  }
}
</style>
