import { ref } from 'vue';
import { generateRandomKey } from '../../utility/helpers.js';

export const TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const TIMEOUT_VALUE = 3000;

/**
 * @namespace Action
 * @property {string | null} slotValue
 * @property {object | undefined} props
 * @property {Function | undefined} click
 * @property {any} component
 */

/**
 * @namespace CommonParams
 * @property {string} id
 * @property {string | null} title - Title message
 * @property {string} message - Text message
 * @property {number | undefined} timeOut - Time to hide
 * @property {Action | undefined} action - Action component
 * @property {function} onTimerCompleted - Call function after timer completed
 *
 * @param {CommonParams} parameters
 */

export class NotificationManager {
  _list = ref([]);

  get list() {
    return this._list;
  }

  /**
   * @namespace CreateParams
   * @property {'info' | 'success' | 'warning' | 'error'} type - Types from const TYPES
   * @property {string | null} title - Title message
   * @property {string | null} message - Text message
   * @property {number} timeOut - Time to hide
   * @property {string} icon - Icon of the left side. Accept icon name
   * @property {object=} meta - Metadata
   * @property {Action | undefined} action - Action component
   * @property {function} onTimerCompleted - Call function after timer completed
   *
   * @param {CreateParams} options - Notification create params
   */
  create(options = {}) {
    const id = options.id || generateRandomKey();

    if (!this.getById(id)) {
      this._list.value.push({
        id,
        icon: options.icon,
        type: options.type || TYPES.INFO,
        title: options.title || null,
        message: options.message || null,
        timeOut: options.timeOut ?? TIMEOUT_VALUE,
        action: options.action || null,
        meta: options.meta || null,
        onTimerCompleted: options.onTimerCompleted || null,
      });
    }
  }

  /**
   * @param {CommonParams} parameters
   */
  info(parameters) {
    this.create({
      type: TYPES.INFO,
      ...parameters,
    });
  }

  /**
   * @param {CommonParams} parameters
   */
  success(parameters) {
    this.create({
      type: TYPES.SUCCESS,
      ...parameters,
    });
  }

  /**
   * @param {CommonParams} parameters
   */
  warning(parameters) {
    this.create({
      type: TYPES.WARNING,
      ...parameters,
    });
  }

  /**
   * @param {CommonParams} parameters
   */
  error(parameters) {
    this.create({
      type: TYPES.ERROR,
      icon: 'warning-filled',
      ...parameters,
    });
  }

  /**
   * @param {string} id - Id of notification
   */
  remove(id) {
    if (this.getById(id)) {
      this._list.value = this._list.value.filter((item) => item.id !== id);
    }
  }

  removeAll() {
    this._list.value = [];
  }

  /**
   * @param {string} id - Id of notification
   */
  getById(id) {
    return this._list.value.find((item) => item.id === id);
  }

  /**
   * @param {CreateParams[]} list - List of notification
   */
  changeList(list) {
    this._list.value = list;
  }
}
