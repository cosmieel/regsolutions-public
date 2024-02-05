<template>
  <button class="item-setting-trigger" @click="emit('click')">
    <div class="item-setting-trigger__icon-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8.66667 2.66667C8.66667 2.29848 8.36819 2 8 2C7.63181 2 7.33333 2.29848 7.33333 2.66667V7.33333H2.66667C2.29848 7.33333 2 7.63181 2 8C2 8.36819 2.29848 8.66667 2.66667 8.66667H7.33333V13.3333C7.33333 13.7015 7.63181 14 8 14C8.36819 14 8.66667 13.7015 8.66667 13.3333V8.66667H13.3333C13.7015 8.66667 14 8.36819 14 8C14 7.63181 13.7015 7.33333 13.3333 7.33333H8.66667V2.66667Z"
          fill="#9CA3AF"
        />
      </svg>
    </div>
    <span class="item-setting-trigger__text">Добавить...</span>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);
</script>

<style lang="postcss" scoped>
.item-setting-trigger {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: var(--m-outer-radius, 8px);
  background: var(--gray-50, #f9fafb);

  &:hover {
    background: var(--gray-100, #f3f4f6);
  }

  &:active {
    background: var(--gray-100, #f3f4f6);
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: var(--gray-100, #f3f4f6);
    border: none;
  }

  &__text {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 8px;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: var(--gray-400, #9ca3af);
  }
}
</style>
