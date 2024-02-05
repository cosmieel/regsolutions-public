<template>
  <div class="ui-table">
    <div class="ui-table__container">
      <table class="ui-table__table">
        <thead class="ui-table__head">
          <slot name="ui-table-head"></slot>
        </thead>
        <tbody class="ui-table__body">
          <slot name="ui-table-body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.ui-table {
  &__container {
    @apply border border-gray-200 rounded-lg;
  }

  &__table {
    @apply divide-y divide-gray-200 w-full;
  }

  &__head {
    @apply w-full;

    :slotted(th) {
      @apply bg-gray-50;

      &:first-of-type {
        @apply rounded-tl-lg;
      }
      &:last-of-type {
        @apply rounded-tr-lg;
      }
    }
  }

  &__body {
    @apply divide-y divide-gray-200;
  }
}
</style>
