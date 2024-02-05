import { reactive } from 'vue';
import { Notification } from '../notification/notification.js';

export const notificationManager = reactive(new Notification());
