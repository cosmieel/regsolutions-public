<template>
  <div class="modal-header-content">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.modal-header-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 8px 8px 12px;
}
</style>
