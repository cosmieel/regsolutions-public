import { modalManager } from 'account/src/instances/modal-manager.js';
import { markRaw } from 'vue';
import ModalView from './modal-view.vue';

export const callAddCsvModal = () =>
  modalManager.open({
    persistent: false,
    content: markRaw(ModalView),
  });
