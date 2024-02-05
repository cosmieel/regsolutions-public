export class AbortControllerManager {
  _controller = new AbortController();

  get signal() {
    return this._controller.signal;
  }

  abort() {
    this._controller.abort();
  }

  reinitialize() {
    this._controller = new AbortController();
  }
}
