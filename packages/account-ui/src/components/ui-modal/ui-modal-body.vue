<template>
  <div class="modal-body">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.modal-body {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  position: relative;
  padding: 24px;
}
</style>
