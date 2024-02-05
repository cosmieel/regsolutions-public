import { WARNING_OF_UNSAVED_CHANGES_MODAL } from './constants.js';
import { callConfirmationModal } from '../confirmation-modal.js';

/**
 * @param {function} onAccept
 */
export const callWarningOfUnsavedChangesModal = (onAccept) =>
  callConfirmationModal(
    {
      title: 'Закрыть редактирование?',
      description: 'Вся заполненая информация будет удалена, потом придется заполнять все заново',
      acceptText: 'Закрыть',
      cancelText: 'Отмена',
      onAccept,
    },
    WARNING_OF_UNSAVED_CHANGES_MODAL
  );
