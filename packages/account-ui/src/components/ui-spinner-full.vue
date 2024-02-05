<template>
  <div class="ui-spinner-full__overlay">
    <div class="flex justify-center">
      <div class="ui-spinner-full__spinner" role="status" aria-label="loading">
        <span class="sr-only">Загрузка...</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.ui-spinner-full {
  &__overlay {
    @apply bg-white bg-opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-auto flex-col justify-center items-center p-4 md:p-5;
  }
  &__spinner {
    @apply animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full;
  }
}
</style>
