<template>
  <div class="page-settings-custom-form-view">
    <FormTextarea :name="HEAD_KEY" label="Tag <head>" placeholder="<script>  ...  </script>">
      <template #afterLabel>
        <CustomCodeTooltip />
      </template>
    </FormTextarea>
    <FormTextarea :name="BODY_KEY" label="Tag <body>" placeholder="<script>  ...  </script>">
      <template #afterLabel>
        <CustomCodeTooltip />
      </template>
    </FormTextarea>
  </div>
</template>

<script setup>
import FormTextarea from 'account/src/components/form/form-text-area.vue';
import CustomCodeTooltip from 'account/src/components/tooltips/custom-code-tooltip.vue';
import { HEAD_KEY, BODY_KEY } from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.page-settings-custom-form-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
