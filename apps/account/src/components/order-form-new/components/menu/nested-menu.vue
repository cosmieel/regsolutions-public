<template>
  <div ref="menuReference" class="hs-dropdown [--placement:right] [--auto-close:false]">
    <BaseOption :icon="triggerIcon" class="hs-dropdown-toggle"> {{ triggerLabel }} </BaseOption>
    <UiDropdown class="top-4 p-4 divide-y divide-gray-100" @click.stop>
      <slot />
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiDropdown } from 'account-ui';
import { onMounted, ref } from 'vue';
import BaseOption from '../options/base-option.vue';

const menuReference = ref(null);

defineProps({
  triggerIcon: {
    type: String,
    required: false,
    default: '',
  },

  triggerLabel: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const handleClose = () => {
  window.HSDropdown.close(menuReference.value);
};

const onClose = () => {
  emit('close');
};

onMounted(() => {
  if (menuReference.value) {
    menuReference.value.addEventListener('close.hs.dropdown', onClose);
  }
});

defineExpose({
  handleClose,
});
</script>
