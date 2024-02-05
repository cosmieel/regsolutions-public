import { callConfirmationModal } from '../confirmation-modal.js';
import { DISCARD_UNSAVED_DATA_TEXT } from '../constants.js';

/**
 * @param {function} onAccept
 */
export const callDiscardUnsavedDataModal = (onAccept) =>
  callConfirmationModal({
    title: DISCARD_UNSAVED_DATA_TEXT.TITLE,
    description: DISCARD_UNSAVED_DATA_TEXT.DESCRIPTION,
    acceptText: DISCARD_UNSAVED_DATA_TEXT.ACCEPT_TEXT,
    cancelText: DISCARD_UNSAVED_DATA_TEXT.CANCEL_TEXT,
    onAccept,
  });
