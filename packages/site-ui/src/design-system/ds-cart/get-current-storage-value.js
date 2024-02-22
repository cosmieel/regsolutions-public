import { STATUSES } from './constants/statuses.js';

export function getCurrentStorageValue(storage) {
  return storage.map((storageItem) => {
    return {
      id: storageItem.id,
      count: storageItem.statuses.includes(STATUSES.STOCK_CHANGED)
        ? storageItem.item.price.stock
        : storageItem.count,
      price: storageItem.statuses.includes(STATUSES.PRICE_CHANGED)
        ? storageItem.item.price.currentPrice
        : storageItem.price,
      statuses: storageItem.statuses,
      item: storageItem.item,
    };
  });
}
