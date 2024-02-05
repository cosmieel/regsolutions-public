import { callDeletionModal } from 'account/src/utility/modals/deletion-modal';

export const callDeleteProductModal = (onDelete, isBulkDeletion = false) =>
  callDeletionModal({
    title: `Хотите удалить ${isBulkDeletion ? 'товары' : 'товар'}?`,
    description: `Все данные ${isBulkDeletion ? 'товаров' : 'товара'} будут удалены`,
    onDelete,
  });
