<template>
  <TransitionGroup class="ds-notification-wrapper" tag="div" name="ds-notification-wrapper">
    <DsNotification
      v-for="notificationInstans in notificationManager.stack"
      :key="notificationInstans.key"
      :type="notificationInstans.data.type"
      :auto-close="notificationInstans.data.autoClose"
      :timeline="notificationInstans.data.timeline"
      :item="notificationInstans.data.item"
      :unique-key="notificationInstans.key"
    />
  </TransitionGroup>
</template>

<script setup>
import DsNotification from 'site-ui/src/design-system/ds-notification/ds-notification.vue';
import { notificationManager } from './manager/notification-manager.js';
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-notification-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  width: calc(100% - 32px);
  z-index: $z-alert;

  @add-mixin desktop-all {
    width: auto;
  }

  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translateY(160px);
  }

  &-leave-to {
    transform: translateY(-160px);
  }
}
</style>
