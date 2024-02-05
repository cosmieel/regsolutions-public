<template>
  <div class="ui-spinner" role="status" aria-label="loading">
    <span class="sr-only">Загрузка...</span>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.ui-spinner {
  @apply animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-blue-700 rounded-full;
}
</style>
