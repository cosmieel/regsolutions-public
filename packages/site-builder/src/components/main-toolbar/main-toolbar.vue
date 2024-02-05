<template>
  <div class="main-toolbar">
    <UiButton class="main-toolbar__button" size="small" :disabled="isEdit" @click="callMenu">
      <UiIcon name="add" :size="16" />
    </UiButton>
    <template v-if="false">
      <span class="main-toolbar__devider"></span>
      <UiButton class="main-toolbar__button" size="small" is-outline :disabled="isEdit">
        <UiIcon name="retry" />
      </UiButton>
      <UiButton class="main-toolbar__button" size="small" is-outline :disabled="isEdit">
        <UiIcon name="retry" class="main-toolbar__forward-icon" />
      </UiButton>
      <span class="main-toolbar__devider"></span>
      <UiButton class="main-toolbar__button" size="small" is-outline :disabled="isEdit">
        <UiIcon name="monitor" />
      </UiButton>
      <UiButton class="main-toolbar__button" size="small" is-outline :disabled="isEdit">
        <UiIcon name="mobile" />
      </UiButton>
    </template>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';

defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['callMenu']);

function callMenu() {
  emit('callMenu');
}
</script>

<style lang="postcss" scoped>
.main-toolbar {
  position: fixed;
  z-index: 400;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  gap: 8px;
  padding: 16px;
  box-shadow: 1px 4px 20px 0px rgba(46, 64, 100, 0.16), 2px 2px 12px 0px rgba(46, 64, 100, 0.04);
  border-radius: 16px;
  border: 1px solid var(--gray-200, #e5e7eb);
  background: var(--white-white-70, rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(32px);

  &__button {
    width: 32px;
    height: 32px;
    padding: 0;
  }

  &__devider {
    width: 1px;
    height: auto;
    margin: 0 8px;
    background: #f3f4f6;
  }

  &__forward-icon {
    transform: rotateY(180deg);
  }
}
</style>
