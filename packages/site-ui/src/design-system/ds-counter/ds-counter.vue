<template>
  <div class="ds-counter">
    <div class="ds-counter__wrapper">
      <button
        class="ds-counter__button"
        :class="classButton"
        :disabled="isLeftDisabled"
        @click="clickToDecrement"
      >
        <DsIcon name="minus" :size="16" />
      </button>
      <span class="ds-counter__count" :class="classCount">{{ count }}</span>
      <button
        class="ds-counter__button"
        :class="classButton"
        :disabled="isRightDisabled"
        @click="clickToIncrement"
      >
        <DsIcon name="add" :size="16" />
      </button>
    </div>
    <span v-if="hint" class="ds-counter__hint">{{ hint }}</span>
  </div>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { computed, ref } from 'vue';

const property = defineProps({
  count: {
    type: Number,
    required: true,
  },

  minCount: {
    type: Number,
    default: 1,
  },

  maxCount: {
    type: Number,
    default: 1000,
  },

  size: {
    type: String,
    default: 's',
  },

  hint: {
    type: String,
    default: '',
  },

  state: {
    type: String,
    default: 'default',
  },
});

const emit = defineEmits(['cangeCount']);

const count = ref(property.count);

const classButton = computed(() => {
  return `ds-counter__button_size_${property.size}`;
});

const classCount = computed(() => {
  return property.state === 'disabled'
    ? `ds-counter__count_state_disabled ds-counter__count_size_${property.size}`
    : `ds-counter__count_size_${property.size}`;
});

const isLeftDisabled = computed(() => {
  return property.state === 'disabled' || count.value === property.minCount;
});

const isRightDisabled = computed(() => {
  return property.state === 'disabled' || count.value === property.maxCount;
});

function clickToDecrement() {
  count.value -= 1;
  emit('cangeCount', count.value);
}

function clickToIncrement() {
  count.value += 1;
  emit('cangeCount', count.value);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-counter {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;

  &__wrapper {
    display: inline-flex;
    overflow: hidden;
    border-radius: $radius-s;
    background-color: var(--bg-input-default);
  }

  &__button {
    border: 0;
    color: var(--font-thertiary);
    background-color: var(--bg-input-default);
    cursor: pointer;

    &:hover {
      background-color: var(--bg-input-hover);
    }

    &_size {
      &_s {
        padding: 8px;
      }

      &_m {
        padding: 16px;
      }
    }

    &:disabled {
      color: var(--font-disable);
      background-color: var(--bg-input-disable);
    }
  }

  &__count {
    display: flex;
    align-items: center;
    color: var(--font-thertiary);
    border-left: 1px solid var(--border-counter);
    border-right: 1px solid var(--border-counter);
    font-weight: 500;
    @add-mixin b3;

    &_size {
      &_s {
        padding: 0 12px;
      }

      &_m {
        padding: 0 16px;

        @add-mixin desktop-all {
          @add-mixin b2;
        }
      }
    }

    &_state_disabled {
      color: var(--font-disable);
    }
  }

  &__hint {
    color: var(--font-secondary);
    text-align: center;
    @add-mixin b5;
  }
}
</style>
