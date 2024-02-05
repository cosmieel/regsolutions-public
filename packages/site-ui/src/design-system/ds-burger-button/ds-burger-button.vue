<template>
  <button class="ds-burger-button" @click="clickBurger">
    <DsIcon :name="iconName" :size="24" />
  </button>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { computed } from 'vue';

const property = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const iconName = computed(() => {
  return property.isActive ? 'close' : 'menu';
});

function clickBurger() {
  emit('click');
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-burger-button {
  padding: 12px;
  border: none;
  background-color: var(--bg-control-primary-default);
  color: var(--font-thertiary);

  &:active {
    & .ds-burger-button__icon {
      transform-origin: left;
      transform: rotateZ(45deg);
    }
  }

  &__icon {
    position: absolute;

    &_type {
      &_first {
        top: 0;
      }

      &_second {
        top: 0;
      }

      &_third {
        top: 0;
      }
    }
  }
}
</style>
