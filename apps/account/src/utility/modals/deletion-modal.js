import { modalManager } from 'account/src/instances/modal-manager.js';
import { callDeletionModalFactory } from 'account-ui';

/**
 * @namespace DeletionModalParams
 * @property {string} title - Title of modal
 * @property {string | null} description - Description of modal
 * @property {string | null | undefined} deletionText - Text of delete button
 * @property {string | null | undefined} cancelText - Text of cancel button
 * @property {function} onDelete - Deletion logic function
 * @property {function | null} onCancel - Cancellation logic function
 * @param {DeletionModalParams} data
 */
export const callDeletionModal = (data) =>
  callDeletionModalFactory(modalManager, {
    title: data.title,
    description: data?.description,
    acceptText: data?.deletionText || 'Удалить',
    cancelText: data?.cancelText || 'Отмена',
    onDelete: data.onDelete,
    onCancel: data.onCancel,
  });
