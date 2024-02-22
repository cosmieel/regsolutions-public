import { STATUSES } from './constants/statuses.js';

export function getItemStatuses(externalItem, catalogItem) {
  const statuses = [];

  if (!catalogItem) {
    statuses.push(STATUSES.DELETED);

    return statuses;
  }

  if (catalogItem.price.stock === 0) {
    statuses.push(STATUSES.NOT_AVAILABLE);

    return statuses;
  }

  if (externalItem.count > catalogItem.price.stock && catalogItem.price.stock !== 0) {
    statuses.push(STATUSES.STOCK_CHANGED);
  }

  if (externalItem.price !== catalogItem.price.currentPrice) {
    statuses.push(STATUSES.PRICE_CHANGED);
  }

  if (statuses.length === 0) {
    statuses.push(STATUSES.NORMAL);
  }

  return statuses;
}
