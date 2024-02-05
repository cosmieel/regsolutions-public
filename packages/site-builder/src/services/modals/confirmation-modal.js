import { callConfirmationModalFactory } from 'account-ui';
import { modalManager } from 'site-builder/src/instances/modal-manager.js';

/**
 * @namespace ConfirmationModalParams
 * @property {string} title - Title of modal
 * @property {string | null} description - Description of modal
 * @property {string} acceptText - Text of accept button
 * @property {string} cancelText - Text of cancel button
 * @property {function} onAccept - Acceptation logic function
 * @property {function | null} onCancel - Cancellation logic function
 * @param {ConfirmationModalParams} data
 * @param {string=} name
 */
export const callConfirmationModal = (data, name) => {
  callConfirmationModalFactory(
    modalManager,
    {
      title: data.title,
      description: data?.description,
      acceptText: data.acceptText,
      cancelText: data.cancelText,
      onAccept: data.onAccept,
      onCancel: data?.onCancel,
    },
    name
  );
};
