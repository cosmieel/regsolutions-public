<template>
  <div class="field-headline">
    <strong class="field-headline__title">{{ title }}</strong>
    <a v-if="link" class="field-headline__link" :href="link">
      <UiIcon v-if="link" name="arrow-right-up" class="field-headline__icon" />
    </a>
  </div>
</template>

<script setup>
import { UiIcon } from 'account-ui';

defineProps({
  title: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
.field-headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding-bottom: 8px;

  &__title {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: var(--gray-500, #6b7280);
  }

  &__link {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: var(--m-outer-radius, 8px);

    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--white-white, #fff);
    box-shadow: 2px 2px 4px 0px rgba(46, 64, 100, 0.04);
  }

  &__icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: #374151;
  }
}
</style>
