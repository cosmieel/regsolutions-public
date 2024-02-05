import { computed, ref } from 'vue';

/**
 * @param {import('vue').Ref<string[] | number[]>} items
 */
export const useBulkItems = (items = []) => {
  const selectedItems = ref(new Set());

  /**
   * @param {string | number} item
   */
  const handleSelect = (item) => {
    selectedItems.value.add(item);
  };

  /**
   * @param {string | number} item
   */
  const handleRemove = (item) => {
    selectedItems.value.delete(item);
  };

  /**
   * @param {string[] | number[]} items
   */
  const handleRemoveSeveral = (items) => {
    for (const item of items) {
      handleRemove(item);
    }
  };

  /**
   * @param {string | number} item
   */
  const handleChange = (item) => {
    if (hasInList(item)) {
      handleRemove(item);
    } else {
      handleSelect(item);
    }
  };

  /**
   * @param {string | number} item
   */
  const hasInList = (item) => {
    return selectedItems.value.has(item) || false;
  };

  const handleSelectAll = () => {
    if (allSelected.value) {
      handleRemoveSeveral(selectedList.value);
    } else {
      for (const item of items.value) {
        handleSelect(item);
      }
    }
  };

  const allSelected = computed(() =>
    items.value.every((item) => selectedList.value.includes(item))
  );

  const selectedList = computed(() => [...selectedItems.value]);

  const getIsBulk = (item) => selectedList.value.length > 1 && hasInList(item);

  return {
    allSelected,
    hasInList,
    getIsBulk,
    selectedItems: selectedList,
    handleSelect,
    handleRemove,
    handleChange,
    handleSelectAll,
    handleRemoveSeveral,
  };
};
