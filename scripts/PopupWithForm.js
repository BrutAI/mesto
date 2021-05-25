import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    const values = {};
    const inputs = ArrayFrom(this._form.querySelectorAll('.form_input'));
    inputs.array.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   // this._form.addEventListener('submit', () => {
  //   //   const data = this._getInputValues();
  //   //   this._submitHandler(data);
  //   // });

  // }

  close() {
    this._form.reset();
    super.close();
  }
}
