<template>
  <div class="modal-header">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.modal-header {
  width: 100%;
  position: relative;
  display: flex;
  padding: 8px 8px 8px 12px;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
}
</style>
