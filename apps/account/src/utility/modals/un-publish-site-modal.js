import { callConfirmationModal } from 'account/src/utility/modals/confirmation-modal';

export const callUnPublishSiteModal = (onAccept) =>
  callConfirmationModal({
    title: 'Снять сайт с публикации?',
    description:
      'Сайт распубликуется со всех доменов и ссылка на него станет недоступна для пользователей',
    acceptText: 'Снять с публикации',
    cancelText: 'Отменить',
    onAccept,
  });
