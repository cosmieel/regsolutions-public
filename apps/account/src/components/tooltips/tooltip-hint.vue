<template>
  <UiTooltip :position="position">
    <template #trigger>
      <UiIcon name="hint" :size="16" class="text-blue-500" />
    </template>

    <template #default>
      <slot />
    </template>
  </UiTooltip>
</template>

<script setup>
import { UiIcon, UiTooltip } from 'account-ui';

defineProps({
  position: {
    type: Array,
    default: () => ['bottom', 'center'],
  },
});
</script>
