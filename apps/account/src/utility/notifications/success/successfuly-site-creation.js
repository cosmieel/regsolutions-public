import { notifyer } from 'account/src/instances/notifyer';

export const callSuccessfullySiteCreationNotification = () =>
  notifyer.success({
    message: 'Сайт успешно создан',
  });
