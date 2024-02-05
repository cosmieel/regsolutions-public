/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStorage = defineStore('cart-storage', () => {
  const _storageTime = 1_209_600_000;
  const _storageKey = 'REG_SOLUTIONS_CART';
  const storage = ref([]);

  const counter = computed(() => {
    return storage.value.length;
  });

  // Для внешнего использования
  function init() {
    const externalStorage = getExternalStorage();

    if (!externalStorage) {
      return;
    }

    if (checkDate(externalStorage.date)) {
      storage.value = externalStorage.state;
    } else {
      clearExternalStorage();
    }
  }

  function addItem(id, count = 1) {
    if (storage.value.length === 0) {
      storage.value.push({ id, count });
    } else {
      updateStorage(id, count);
    }

    setExternalStorage({ date: Date.now(), state: storage.value });
  }

  function deleteItem(id) {
    for (const [index, item] of storage.value.entries()) {
      if (item.id === id) {
        storage.value.splice(index, 1);
      }
    }

    setExternalStorage({ date: Date.now(), state: storage.value });
  }

  function getItemCount(id) {
    for (const item of storage.value) {
      if (item.id === id) {
        return item.count;
      }
    }

    return 0;
  }

  function changeCount(id, newCount) {
    for (const item of storage.value) {
      if (item.id === id) {
        item.count = newCount;
      }
    }

    setExternalStorage({ date: Date.now(), state: storage.value });
  }

  function increaseCount(id) {
    updateStorage(id, 1);
    setExternalStorage({ date: Date.now(), state: storage.value });
  }

  function decreaseCount(id) {
    for (const [index, item] of storage.value.entries()) {
      if (item.id === id) {
        item.count > 1 ? item.count - 1 : storage.value.splice(index, 1);
      }
    }

    setExternalStorage({ date: Date.now(), state: storage.value });
  }

  function clearStorage() {
    storage.value = [];
    clearExternalStorage();
  }

  // Для внутреннего использования (работа с localStorage)

  function getExternalStorage() {
    return JSON.parse(localStorage.getItem(_storageKey));
  }

  function setExternalStorage(storageState) {
    if (storageState.state.length > 0) {
      localStorage.setItem(_storageKey, JSON.stringify(storageState));
    } else {
      clearExternalStorage();
    }
  }

  function clearExternalStorage() {
    localStorage.removeItem(_storageKey);
  }

  // Для внутреннего использования (хелперы)

  function checkDate(externalDate) {
    return Date.now() - externalDate < _storageTime;
  }

  function updateStorage(id, count) {
    for (const item of storage.value) {
      if (item.id === id) {
        item.count += count;

        return;
      }
    }

    storage.value.push({ id, count });
  }

  return {
    storage,
    counter,
    init,
    addItem,
    deleteItem,
    getItemCount,
    changeCount,
    increaseCount,
    decreaseCount,
    clearStorage,
  };
});
