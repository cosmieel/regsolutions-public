<template>
  <ul class="ui-pagination-base">
    <li>
      <UiPaginationButton
        prev
        :disabled="currentPage === 1"
        @click.prevent="handlePageSelect(currentPage - 1)"
      />
    </li>

    <li v-if="needFirstButton">
      <UiPaginationButton @click.prevent="handlePageSelect(1)"> 1 </UiPaginationButton>
    </li>

    <li v-if="needStartBreakPoint">
      <UiPaginationButton
        truncated
        @click.prevent="handlePageSelect(currentPage - Math.ceil(maxPagesShown / 2))"
      />
    </li>

    <li v-for="(page, index) in paginate.pages" :key="index">
      <UiPaginationButton
        :active="page === currentPage"
        @click.prevent="() => handlePageSelect(page)"
      >
        {{ page }}
      </UiPaginationButton>
    </li>

    <li v-if="needEndBreakPoint">
      <UiPaginationButton
        truncated
        @click.prevent="handlePageSelect(currentPage + Math.ceil(maxPagesShown / 2))"
      />
    </li>

    <li v-if="needLastButton">
      <UiPaginationButton @click.prevent="handlePageSelect(totalPages)">
        {{ totalPages }}
      </UiPaginationButton>
    </li>

    <li>
      <UiPaginationButton
        next
        :disabled="currentPage === totalPages"
        @click.prevent="handlePageSelect(currentPage + 1)"
      />
    </li>
  </ul>
</template>

<script setup>
import { toRef } from 'vue';
import { UiPaginationButton, usePagination } from './index.js';

const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
  },

  perPage: {
    type: Number,
    default: 10,
  },

  modelValue: {
    type: Number,
    required: true,
  },

  maxPagesShown: {
    type: Number,
    default: 5,
  },

  onPageSelected: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(['update:modelValue']);

const currentPage = toRef(props, 'modelValue');

const {
  maxPagesShown,
  handlePageSelect,
  totalPages,
  paginate,
  needStartBreakPoint,
  needEndBreakPoint,
  needFirstButton,
  needLastButton,
} = usePagination(props, emit, currentPage);
</script>

<style lang="postcss" scoped>
.ui-pagination-base {
  @apply flex items-center justify-center;
  padding-inline-start: 0;
  list-style-type: none;
}
</style>
