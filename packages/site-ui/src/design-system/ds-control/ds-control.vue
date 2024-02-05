<template>
  <button class="ds-control" :class="controlClass" @click="handleClick">
    <DsIcon :name="iconName" />
  </button>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { computed } from 'vue';

const emit = defineEmits(['click']);

const property = defineProps({
  type: {
    type: String,
    default: 'left',
  },

  color: {
    type: String,
    default: 'primary',
  },
});

const iconName = computed(() => {
  return property.type === 'left' ? 'chevron-s-left' : 'chevron-s-right';
});

const controlClass = computed(() => {
  return `ds-control_color_${property.color}`;
});

function handleClick(event) {
  emit('click', event);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-control {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  z-index: 1;

  &_color {
    &_primary {
      color: var(--font-primary);
      border-radius: 50%;
      background-color: var(--bg-control-primary-default);
      box-shadow: $shadow-l;
      transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out;

      &:hover {
        background-color: var(--bg-control-primary-hover);
        transform: scale(1.1);
      }

      &:active {
        background-color: var(--bg-control-primary-active);
        transform: scale(1);
      }
    }

    &_secondary {
      color: var(--font-primary-inverse);
      border-radius: 50%;
      background-color: var(--bg-control-secondary-default);
      backdrop-filter: $blur-m;
      transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out;

      &:hover {
        background-color: var(--bg-control-secondary-hover);
        transform: scale(1.1);
      }

      &:active {
        background-color: var(--bg-control-secondary-active);
        transform: scale(1);
      }
    }

    &_secondary-inverse {
      color: var(--font-primary-inverse);
      border-radius: 50%;
      background-color: var(--bg-control-secondary-inverse-default);
      backdrop-filter: $blur-m;
      transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out;

      &:hover {
        background-color: var(--bg-control-secondary-inverse-hover);
        transform: scale(1.1);
      }

      &:active {
        background-color: var(--bg-control-secondary-inverse-active);
        transform: scale(1);
      }
    }

    &_overlay {
      color: var(--font-primary-inverse);
      border-radius: $radius-s;
      background-color: inherit;
      backdrop-filter: $blur-m;
      transition: background-color 0.15s ease-in-out, backdrop-filter 0.05s ease-in-out;

      &:hover {
        background-color: var(--bg-control-overlay-hover);
      }

      &:active {
        background-color: inherit;
      }
    }
  }
}
</style>
