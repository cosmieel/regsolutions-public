<template>
  <div class="add-product-manually">
    <div class="add-product-manually__inner">
      <div class="add-product-manually__add">
        <UiButton class="add-product-manually__button" size="small" @click="$emit('add')">
          <UiIcon name="add" :size="16" />
          {{ buttonText }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';

defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});

defineEmits(['add']);
</script>

<style lang="postcss" scoped>
.add-product-manually {
  @apply pb-4;

  &__inner {
    @apply flex items-center justify-end;
  }

  &__text {
    @apply py-6 text-sm leading-6;
  }

  &__button {
    @apply flex items-center justify-center;

    svg {
      @apply mr-1;
    }
  }
}
</style>
