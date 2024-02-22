<template>
  <div class="order-form-add-item hs-dropdown [--placement:bottom] [--strategy:absolute]">
    <button class="order-form-add-item__trigger">
      <UiIcon name="add" :size="14" />
    </button>
    <UiDropdown class="top-4">
      <UiListItem
        v-for="(item, index) in menuList"
        :key="index"
        is-hoverable
        :disabled="item.disabled"
        @click="$emit('add', item.type)"
      >
        {{ item.label }}
      </UiListItem>
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiDropdown, UiIcon, UiListItem } from 'account-ui';
import { computed } from 'vue';
import { POSSIBLE_MENU_LIST } from '../data.js';

const props = defineProps({
  isDisabled: {
    type: Function,
    required: false,
    default: () => false,
  },
});

defineEmits(['add']);

const menuList = computed(() =>
  POSSIBLE_MENU_LIST.map((item) => {
    return {
      ...item,
      disabled: props.isDisabled(item.type),
    };
  })
);
</script>

<style lang="postcss" scoped>
.order-form-add-item {
  @apply relative;

  &__trigger {
    @apply absolute w-[40px] h-[40px] border rounded-3xl border-gray-200 flex justify-center items-center z-10 bg-white left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer drop-shadow-sm;
  }
}
</style>
