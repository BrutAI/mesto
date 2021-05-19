import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor (popupSelector, image) {
    super(popupSelector);
    this._link = image.link;
    this._name = image.name;
    this._gallery = document.querySelector(this._popupSelector);
    this._image = this._gallery.querySelector('.popup__image');
    this._caption = this._gallery.querySelector('.popup__caption');
  }

  open() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
    super.open();
  }
}
