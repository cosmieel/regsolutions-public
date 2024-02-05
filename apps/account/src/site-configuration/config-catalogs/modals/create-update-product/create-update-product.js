import { modalManager } from 'account/src/instances/modal-manager.js';
import { markRaw } from 'vue';
import ModalView from './modal-view.vue';

/**
 * @namespace CreateUpdateProps
 * @property {object | null} product
 * @property {array} catalogsList
 * @param {CreateUpdateProps} props
 */
export const callOpenCreateUpdateModal = (props) =>
  modalManager.open({
    props,
    modalTranslate: false,
    persistent: false,
    content: markRaw(ModalView),
  });
