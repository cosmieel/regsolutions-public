import { callConfirmationModal } from 'account/src/utility/modals/confirmation-modal';
import { DISCARD_UNSAVED_DATA_TEXT } from 'account/src/utility/modals/constants.js';

/**
 * @param {function} onAccept
 */
export const callDiscardCreationModal = (onAccept) =>
  callConfirmationModal({
    title: DISCARD_UNSAVED_DATA_TEXT.TITLE,
    description: DISCARD_UNSAVED_DATA_TEXT.DESCRIPTION,
    acceptText: 'Выйти',
    cancelText: DISCARD_UNSAVED_DATA_TEXT.CANCEL_TEXT,
    onAccept,
  });
