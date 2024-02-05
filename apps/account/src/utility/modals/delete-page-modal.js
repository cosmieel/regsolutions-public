import { callDeletionModal } from './deletion-modal.js';

export const callDeletePageModal = (onDelete, name) =>
  callDeletionModal({
    title: `Хотите удалить страницу${name ? ` "${name}"?` : '?'}`,
    description: 'Все данные страницы будут удалены',
    onDelete,
  });
