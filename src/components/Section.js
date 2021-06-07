export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerName = document.querySelector(containerSelector);
  }

  addItem(element, atStart = false) {
    if (atStart) {
      this._containerName.prepend(element);
    } else {
      this._containerName.append(element);
    }
  }

  renderItems(items, myId) {
    items.forEach(item => this._renderer(item, myId));
  }
}
