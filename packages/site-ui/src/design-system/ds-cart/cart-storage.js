/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore } from 'pinia';
import { ref, computed, toRaw } from 'vue';
import { STATUSES } from './constants/statuses.js';
import { getCurrentStorageValue } from './get-current-storage-value.js';
import { getInitStorageValue } from './get-init-storage-value.js';
import { mapForExternal } from './maps/map-for-external.js';

export const useCartStorage = defineStore('cart-storage', () => {
  const _storageTime = 1_209_600_000;
  const _storageKey = 'REG_SOLUTIONS_CART';
  const storage = ref([]);
  const opened = ref(false);

  const counter = computed(() => {
    if (storage.value.length === 0) {
      return;
    }

    return storage.value.filter((item) => !item.statuses.includes(STATUSES.DELETED)).length;
  });

  const storageStatuses = computed(() => {
    const statuses = [];

    for (const item of storage.value) {
      statuses.push(...item.statuses);
    }

    return [...new Set(statuses)];
  });

  // Для внешнего использования
  function init(catalogItems) {
    const externalStorage = getExternalStorage();

    if (!externalStorage) {
      return;
    }

    if (checkDate(externalStorage.date)) {
      storage.value = getInitStorageValue(catalogItems, externalStorage);
    } else {
      clearExternalStorage();
    }
  }

  function addItem(item, count = 1) {
    if (hasItem(item.id)) {
      increaseItemCount(item.id, count);
    } else {
      storage.value.push(createItemParameters(item));
    }

    setExternalStorage({ date: Date.now(), state: mapForExternal(storage.value) });
  }

  function deleteItem(id) {
    for (const [index, item] of storage.value.entries()) {
      if (item.id === id) {
        storage.value.splice(index, 1);
      }
    }

    setExternalStorage({ date: Date.now(), state: mapForExternal(storage.value) });
  }

  function changeCount(id, newCount) {
    for (const item of storage.value) {
      if (item.id === id) {
        item.count = newCount;
        item.statuses = item.statuses.filter((status) => status !== STATUSES.STOCK_CHANGED);
        item.statuses = item.statuses.length === 0 ? [STATUSES.NORMAL] : item.statuses;
      }
    }

    setExternalStorage({ date: Date.now(), state: mapForExternal(storage.value) });
  }

  function openCartList() {
    if (opened.value) {
      return;
    }

    storage.value = getCurrentStorageValue(toRaw(storage.value));
  }

  function closeCartList() {
    if (opened.value) {
      return;
    }

    const deletedId = [];

    for (const item of storage.value) {
      if (item.statuses.includes(STATUSES.DELETED)) {
        deletedId.push(item.id);
      }

      item.statuses = item.statuses.filter((status) => {
        return status !== STATUSES.STOCK_CHANGED && status !== STATUSES.PRICE_CHANGED;
      });

      if (item.statuses.length === 0) {
        item.statuses.push(STATUSES.NORMAL);
      }
    }

    for (const id of deletedId) {
      deleteItem(id);
    }

    setExternalStorage({ date: Date.now(), state: mapForExternal(storage.value) });

    opened.value = true;
  }

  function getItemCount(id) {
    for (const item of storage.value) {
      if (item.id === id) {
        return item.count;
      }
    }

    return 0;
  }

  function clearStorage() {
    storage.value = [];
    clearExternalStorage();
  }

  // Для внутреннего использования (хелперы)
  function increaseItemCount(id, count) {
    for (const item of storage.value) {
      if (item.id === id) {
        item.count += count;

        return;
      }
    }
  }

  function hasItem(id) {
    return storage.value.find((item) => item.id === id);
  }

  function createItemParameters(item, count = 1) {
    return {
      id: item.id,
      count,
      price: item.price?.currentPrice,
      statuses: [STATUSES.NORMAL],
      item,
    };
  }

  function checkDate(externalDate) {
    return Date.now() - externalDate < _storageTime;
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

  return {
    storage,
    counter,
    storageStatuses,
    init,
    addItem,
    deleteItem,
    openCartList,
    closeCartList,
    getItemCount,
    changeCount,
    clearStorage,
  };
});
