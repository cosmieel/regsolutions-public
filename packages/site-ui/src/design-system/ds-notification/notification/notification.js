export class Notification {
  constructor() {
    this.stack = [];
  }

  add(data) {
    this.stack.push({
      key: this.getUniqueKey(),
      data: data,
    });
  }

  remove(key) {
    for (const [index, Notification] of this.stack.entries()) {
      if (Notification.key === key) {
        this.stack.splice(index, 1);
      }
    }
  }

  getUniqueKey() {
    return Date.now();
  }
}
