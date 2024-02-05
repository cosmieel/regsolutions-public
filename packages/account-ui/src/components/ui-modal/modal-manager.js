import isEmpty from 'lodash/isEmpty';
import { ref } from 'vue';
import { generateRandomKey } from '../../utility/helpers.js';

export class ModalManager {
  _list = ref([]);

  get list() {
    return this._list;
  }

  /**
   * @namespace Data
   * @property {string | null} name - Needs for close exact modal
   * @property {any} content - Modal component
   * @property {boolean} modalTranslate
   * @property {boolean} persistent - Needs for close modal by overlay. By default, false
   * @property {object} props - Properties for modal content
   * @param {Data} data
   */
  open(data) {
    if (typeof data === 'object' && !isEmpty(data)) {
      this._list.value.push({
        name: data?.name,
        content: data?.content,
        id: generateRandomKey(),
        props: data?.props || {},
        persistent: data?.persistent || false,
        modalTranslate: data?.modalTranslate ?? true,
      });
    }
  }

  close(name) {
    if (name && typeof name === 'string') {
      const foundIndex = this._list.value.findIndex((item) => item?.name === name);

      if (foundIndex === -1) {
        this._list.value.pop();
      } else {
        this._list.value.splice(foundIndex, 1);
      }

      return;
    }

    this._list.value.pop();
  }

  closeAll() {
    this._list.value = [];
  }
}
