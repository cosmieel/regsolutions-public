import { modalManager } from 'account/src/instances/modal-manager.js';
import { callConfirmationModalFactory } from 'account-ui';

/**
 * @namespace ConfirmationModalParams
 * @property {string} title - Title of modal
 * @property {string | null} description - Description of modal
 * @property {string} acceptText - Text of accept button
 * @property {string} cancelText - Text of cancel button
 * @property {function} onAccept - Acceptation logic function
 * @property {function | null} onCancel - Cancellation logic function
 * @param {ConfirmationModalParams} data
 */
export const callConfirmationModal = (data) => {
  callConfirmationModalFactory(modalManager, {
    title: data.title,
    description: data?.description,
    acceptText: data.acceptText,
    cancelText: data.cancelText,
    onAccept: data.onAccept,
    onCancel: data?.onCancel,
  });
};
