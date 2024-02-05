import { callDeletionModal } from 'account/src/utility/modals/deletion-modal';

export const callDeleteCatalogModal = (onDelete, isBulkDeletion = false) =>
  callDeletionModal({
    title: `Хотите удалить ${isBulkDeletion ? 'каталоги' : 'каталог'}?`,
    description: `Все товары из ${isBulkDeletion ? 'каталогов' : 'каталога'} будут удалены`,
    onDelete,
  });
