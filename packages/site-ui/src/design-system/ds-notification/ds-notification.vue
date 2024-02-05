<template>
  <div class="ds-notification" :class="notificationClass">
    <component :is="getItemComponent()" :item="item" @close="close" />

    <DsButton
      v-if="!autoClose"
      theme="fab"
      size="s"
      color="transperent-inverse"
      icon="close"
      aria-label="Close"
      class="ds-notification__close-button"
      @click="close"
    />
  </div>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { onMounted, computed } from 'vue';
import DsNotificationItemPlain from './items/ds-notification-item-plain.vue';
import { notificationManager } from './manager/notification-manager.js';

const property = defineProps({
  type: {
    type: String,
    default: 'info',
  },

  autoClose: {
    type: Boolean,
    default: false,
  },

  timeline: {
    type: Number,
    default: 3000,
  },

  item: {
    type: Object,
    required: true,
  },

  uniqueKey: {
    type: Number,
    required: true,
  },
});

const items = {
  DsNotificationItemPlain,
};

onMounted(() => {
  if (!property.autoClose) {
    return;
  }

  setTimeout(() => {
    notificationManager.remove(property.uniqueKey);
  }, property.timeline);
});

const notificationClass = computed(() => {
  return property.autoClose
    ? `ds-notification_type_${property.type}`
    : `ds-notification_type_${property.type} ds-notification_static`;
});

function close() {
  notificationManager.remove(property.uniqueKey);
}

function getItemComponent() {
  const type = property.item.type;

  return items[`DsNotificationItem${type[0].toUpperCase() + type.slice(1)}`];
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-notification {
  position: relative;
  width: 100%;

  @add-mixin desktop-all {
    width: max-content;
    max-width: 648px;
  }

  &_type {
    &_info {
      padding: 20px;
      background-color: var(--bg-notification-dark);
      border-radius: $radius-m;
      backdrop-filter: $blur-m;

      &.ds-notification_static {
        @add-mixin desktop-all {
          padding-right: 60px;
        }
      }

      .ds-notification__close-button {
        position: absolute;
        top: 13px;
        right: 13px;

        @add-mixin desktop-all {
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
        }
      }
    }

    &_error {
      padding: 20px;
      background-color: var(--bg-notification-red);
      border-radius: $radius-m;
      backdrop-filter: $blur-m;

      &.ds-notification_static {
        @add-mixin desktop-all {
          padding-right: 60px;
        }
      }

      .ds-notification__close-button {
        position: absolute;
        top: 13px;
        right: 13px;

        @add-mixin desktop-all {
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
