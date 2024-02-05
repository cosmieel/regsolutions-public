import { ref, computed } from 'vue';

export const useDeletedItems = (localStorageId) => {
  const deletedItemsSet = ref(
    new Set(
      localStorage.getItem(localStorageId) ? JSON.parse(localStorage.getItem(localStorageId)) : []
    )
  );

  const handleSetLocalStorageItems = () => {
    if (localStorageId) {
      if (deletedItems.value.length > 0) {
        localStorage.setItem(localStorageId, JSON.stringify(deletedItems.value));
      } else {
        localStorage.removeItem(localStorageId);
      }
    }
  };

  /**
   * @param {string} id
   */
  const addDeletedItem = (id) => {
    if (!deletedItemsSet.value.has(id)) {
      deletedItemsSet.value.add(id);

      handleSetLocalStorageItems();
    }
  };

  /**
   * @param {string[]} ids
   */
  const addSeveral = (ids) => {
    for (const id of ids) {
      addDeletedItem(id);
    }
  };

  /**
   * @param {string} id
   */
  const removeDeletedItem = (id) => {
    if (deletedItemsSet.value.has(id)) {
      deletedItemsSet.value.delete(id);

      handleSetLocalStorageItems();
    }
  };

  /**
   * @param {string[]} ids
   */
  const removeSeveral = (ids) => {
    for (const id of ids) {
      removeDeletedItem(id);
    }
  };

  const deletedItems = computed(() => [...deletedItemsSet.value].map(Number));

  return { deletedItems, addDeletedItem, removeDeletedItem, addSeveral, removeSeveral };
};
