<template>
  <div
    ref="triggerReference"
    class="ui-tooltip"
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
  >
    <div v-if="hasTrigger" class="ui-tooltip__trigger">
      <slot name="trigger" />
    </div>
    <Transition>
      <div
        v-if="visible"
        ref="contentContainerReference"
        class="ui-tooltip__content-container"
        :style="{ top: `${top}px`, left: `${left}px` }"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, useSlots } from 'vue';

const props = defineProps({
  position: {
    type: Array,
    default: () => ['top', 'right'],
  },

  contentOffset: {
    type: Number,
    required: false,
    default: -5,
  },
});

const slots = useSlots();

const visible = ref(false);
const triggerReference = ref(null);
const contentContainerReference = ref(null);
const top = ref(0);
const left = ref(0);

const hasTrigger = computed(() => slots.trigger);

const handleSetPosition = () => {
  nextTick(() => {
    const triggerRect = triggerReference.value.getBoundingClientRect();
    const tooltipHeight = contentContainerReference.value?.clientHeight || 0;
    const tooltipWidth = contentContainerReference.value?.clientWidth || 0;

    switch (props.position[0]) {
      case 'top': {
        top.value = triggerRect.top - tooltipHeight + props.contentOffset;

        break;
      }
      case 'center': {
        top.value = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;

        break;
      }
      case 'bottom': {
        top.value = triggerRect.bottom - props.contentOffset;

        break;
      }
    }

    switch (props.position[1]) {
      case 'left': {
        left.value = triggerRect.left - tooltipWidth + props.contentOffset;

        break;
      }
      case 'center': {
        left.value = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

        break;
      }
      case 'right': {
        left.value = triggerRect.right - props.contentOffset;

        break;
      }
    }
  });
};

const setVisibility = (value) => {
  if (visible.value !== value) {
    visible.value = value;

    handleSetPosition();
  }
};
</script>

<style lang="postcss" scoped>
.ui-tooltip {
  @apply relative max-w-max;

  &__trigger {
    @apply cursor-help max-w-max;
  }

  &__content-container {
    @apply fixed inline-flex py-[10px] px-[12px] flex-col items-start gap-[2px] rounded-[8px] break-all bg-gray-800 text-white z-[1] text-sm;
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
