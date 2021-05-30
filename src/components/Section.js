export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
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

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
}
