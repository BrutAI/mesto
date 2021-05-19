import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this.popupSelector.querySelector('.popup__form');
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => this._submitHandler(evt));
  }

  close() {
    this._form.reset();
    super.close();
  }
}
