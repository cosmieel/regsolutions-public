<template>
  <div class="ui-alerts-wrapper">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.ui-alerts-wrapper {
  @apply fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] space-y-2 flex flex-col items-center;
}
</style>
