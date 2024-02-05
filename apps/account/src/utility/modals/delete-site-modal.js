import { callDeletionModal } from './deletion-modal.js';

export const callDeleteSiteModal = (onDelete) =>
  callDeletionModal({
    title: 'Хотите удалить сайт?',
    description: 'Все данные сайта будут удалены',
    onDelete,
  });
