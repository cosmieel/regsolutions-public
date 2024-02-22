import { computed, ref, watch, toRef } from 'vue';
import { totalCount as total } from '../../utility/helpers/pagination.js';

export const usePagination = (props, emit, currentPage) => {
  const { totalCount, perPage, modelValue, maxPagesShown, onPageSelected } = props;

  const handlePageSelect = (number) => {
    if (number === currentPage.value) {
      return;
    }

    if (number > totalPages.value) {
      return;
    }

    if (number < 1) {
      return;
    }

    emit('update:modelValue', number);

    onPageSelected(number);
  };

  const totalPages = ref(total(totalCount, perPage));

  const currentTotalCount = toRef(props, 'totalCount');

  watch(currentTotalCount, (value) => {
    totalPages.value = total(value, perPage);
    handlePageSelect(1);
  });

  const paginate = computed(() => {
    let startPage, endPage;

    if (totalPages.value <= maxPagesShown) {
      startPage = 1;
      endPage = totalPages.value;
    } else {
      let maxPagesShownBeforeCurrentPage = Math.floor(maxPagesShown / 2);
      let maxPagesShownAfterCurrentPage = Math.ceil(maxPagesShown / 2) - 1;

      if (currentPage.value <= maxPagesShownBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesShown;
      } else if (currentPage.value + maxPagesShownAfterCurrentPage >= totalPages.value) {
        startPage = totalPages.value - maxPagesShown + 1;
        endPage = totalPages.value;
      } else {
        startPage = currentPage.value - maxPagesShownBeforeCurrentPage;
        endPage = currentPage.value + maxPagesShownAfterCurrentPage;
      }
    }

    let pages = [...Array.from({ length: endPage + 1 - startPage }).keys()].map(
      (index) => startPage + index
    );

    return {
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  });

  const needStartBreakPoint = computed(() => paginate.value.pages[0] >= 3);
  const needEndBreakPoint = computed(() => paginate.value.pages.at(-1) < totalPages.value - 1);

  const needFirstButton = computed(() => paginate.value.pages[0] >= 2);
  const needLastButton = computed(() => paginate.value.pages.at(-1) < totalPages.value);

  return {
    totalCount,
    perPage,
    modelValue,
    maxPagesShown,
    onPageSelected,
    currentPage,
    handlePageSelect,
    totalPages,
    paginate,
    needStartBreakPoint,
    needEndBreakPoint,
    needFirstButton,
    needLastButton,
  };
};
