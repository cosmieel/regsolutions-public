import { callConfirmationModalFactory } from './call-confirmation-modal-factory.js';

/**
 * @namespace DeletionModalParams
 * @property {string} title - Title of modal
 * @property {string | null} description - Description of modal
 * @property {string | null | undefined} deletionText - Text of delete button
 * @property {string | null | undefined} cancelText - Text of cancel button
 * @property {function} onDelete - Deletion logic function
 * @property {function | null} onCancel - Cancellation logic function
 * @param {import('../../ui-modal/modal-manager.js').ModalManager} managerInstance
 * @param {DeletionModalParams} data
 */
export const callDeletionModalFactory = (managerInstance, data) =>
  callConfirmationModalFactory(managerInstance, {
    title: data.title,
    description: data?.description,
    acceptText: data?.deletionText || 'Удалить',
    cancelText: data?.cancelText || 'Отмена',
    onAccept: data.onDelete,
    onCancel: data.onCancel,
  });
