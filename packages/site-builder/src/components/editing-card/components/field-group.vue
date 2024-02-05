<template>
  <div class="field-group">
    <p class="field-group__title" :class="{ 'field-group__title_disabled': disabled }">
      {{ title }}
      <span
        v-if="tooltip"
        ref="tooltipTrigger"
        class="field-group__icon-wrapper"
        @mouseenter="changeShow(true)"
        @mouseleave="changeShow(false)"
      >
        <UiIcon class="field-group__icon" name="hint" />
        <Transition>
          <span
            v-if="showTooltip"
            ref="tooltipElement"
            :style="{ top: `${top}px`, left: `${left}px` }"
            class="field-group__tooltip"
            v-html="tooltip"
          ></span>
        </Transition>
      </span>
    </p>
    <div class="field-group__wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { UiIcon } from 'account-ui';
import { ref, nextTick } from 'vue';

const property = defineProps({
  title: {
    type: String,
    required: true,
  },

  tooltip: {
    type: String,
    default: '',
  },

  tooltipPosition: {
    type: Array,
    default: () => ['top', 'right'],
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const showTooltip = ref(false);
const tooltipTrigger = ref(null);
const tooltipElement = ref(null);
const top = ref(null);
const left = ref(null);

function changeShow(enter) {
  showTooltip.value = enter;

  if (enter) {
    nextTick(() => {
      const triggerRect = tooltipTrigger.value.getBoundingClientRect();
      const tooltipHeight = tooltipElement.value.clientHeight;
      const tooltipWidth = tooltipElement.value.clientWidth;

      switch (property.tooltipPosition[0]) {
        case 'top': {
          top.value = triggerRect.top - tooltipHeight + 2;

          break;
        }
        case 'center': {
          top.value = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;

          break;
        }
        case 'bottom': {
          top.value = triggerRect.bottom - 2;

          break;
        }
      }

      switch (property.tooltipPosition[1]) {
        case 'left': {
          left.value = triggerRect.left - tooltipWidth + 2;

          break;
        }
        case 'center': {
          left.value = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

          break;
        }
        case 'right': {
          left.value = triggerRect.right - 2;

          break;
        }
      }
    });
  }
}
</script>

<style lang="postcss" scoped>
.field-group {
  display: flex;
  flex-direction: row;
  gap: 8px;

  &__title {
    position: relative;
    flex-shrink: 0;
    display: flex;
    gap: 2px;
    width: 108px;
    padding: 14px 0 0 8px;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: var(--gray-400, #9ca3af);

    &_disabled {
      opacity: 0.5;
    }
  }

  &__wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0;
  }

  &__icon-wrapper {
    position: relative;
    top: 0;
    right: 0;
    height: 14px;
  }

  &__icon {
    width: 14px;
    height: 14px;
    margin-top: 2px;
    color: var(--gray-900, #9ca3af);
  }

  &__tooltip {
    position: fixed;
    display: inline-flex;
    padding: 10px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    border-radius: 8px;
    text-wrap: nowrap;
    background: var(--gray-800, #1f2937);
    color: #fff;
    z-index: 1;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
