<template>
  <ColorPickerPopover v-model="field.value">
    <template v-if="hasTriggerSlot" #trigger="{ handleOpen }">
      <slot name="trigger" :handle-open="handleOpen" />
    </template>
  </ColorPickerPopover>
</template>

<script setup>
import { useField } from 'vee-validate';
import { computed, reactive, useSlots } from 'vue';
import ColorPickerPopover from '../color-picker-popover.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  validateOnValueUpdate: {
    type: Boolean,
    required: false,
    default: true,
  },

  validateOnMount: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slots = useSlots();

const hasTriggerSlot = computed(() => !!slots.trigger);

const field = reactive(
  useField(props?.name || '', undefined, {
    validateOnMount: props.validateOnMount,
    validateOnValueUpdate: props.validateOnValueUpdate,
  })
);
</script>
