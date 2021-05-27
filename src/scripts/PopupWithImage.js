import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image');
    this._caption = this._popupSelector.querySelector('.popup__caption');
  }

  open(url, text) {
    this._image.src = url;
    this._image.alt = text;
    this._caption.textContent = text;
    super.open();
  }
}
