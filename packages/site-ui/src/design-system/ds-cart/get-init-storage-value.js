import { getItemStatuses } from './get-item-statuses.js';

export function getInitStorageValue(currentCalogItems, externalStorage) {
  return externalStorage.state.map((item) => {
    const catalogItem = currentCalogItems.find(
      (currentCalogItem) => currentCalogItem.id === item.id
    );

    const statuses = getItemStatuses(item, catalogItem);

    return {
      id: item.id,
      count: item.count,
      price: item.price,
      statuses,
      item: catalogItem,
    };
  });
}
