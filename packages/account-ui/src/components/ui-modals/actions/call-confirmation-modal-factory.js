import { markRaw } from 'vue';
import UiConfirmationModal from '../ui-confirmation-modal.vue';

/**
 * @namespace ConfirmationModalParams
 * @property {string} title - Title of modal
 * @property {string | null} description - Description of modal
 * @property {string} acceptText - Text of accept button
 * @property {string} cancelText - Text of cancel button
 * @property {function} onAccept - Acceptation logic function
 * @property {function | null} onCancel - Cancellation logic function
 * @param {import('../../ui-modal/modal-manager.js').ModalManager} managerInstance
 * @param {ConfirmationModalParams} data
 * @param {string=} name
 */
export const callConfirmationModalFactory = (managerInstance, data, name) => {
  managerInstance.open({
    name,
    props: {
      title: data.title,
      description: data?.description,
      acceptText: data.acceptText,
      cancelText: data.cancelText,
      onAccept: data.onAccept,
      onCancel: data?.onCancel,
    },
    content: markRaw(UiConfirmationModal),
  });
};
