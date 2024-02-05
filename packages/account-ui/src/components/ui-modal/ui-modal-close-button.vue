<template>
  <UiButton class="modal-close-button" is-ghost @click="handleClose">
    <UiIcon name="close" :size="16" />
  </UiButton>
</template>

<script setup>
import { inject } from 'vue';
import { PROVIDE_MODAL_INSTANCE_KEY } from './constants.js';
import UiButton from '../ui-button.vue';
import UiIcon from '../ui-icon.vue';

const instance = inject(PROVIDE_MODAL_INSTANCE_KEY);

const handleClose = () => {
  instance.close?.();
};
</script>

<style lang="postcss" scoped>
.modal-close-button {
  width: 32px;
  height: 32px;
  padding: 0;
}
</style>
