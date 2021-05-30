import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      const data = this._getInputValues();
      this._submitHandler(data);
      this.close();
    });

  }

  close() {
    this._form.reset();
    super.close();
  }
}
