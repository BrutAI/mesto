class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError() {

  }

  _hideInputError() {

  }

  _checkInputValidity(formElement, inputElement) {


    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      showInputError(formElement, inputElement, errorMessage, dict);
    } else {
      hideInputError(formElement, inputElement, dict);
    }

  }

  _hasInvalidInput() {

  }

  _toggleButtonState() {

  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

   //toggleButtonState(inputList, buttonElement, dict.inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this.checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement, dict.inactiveButtonClass);
      });
    });

  }

  enableValidation() {
      this._form.addEventListener('submit', evt => evt.preventDefault());

      this._setEventListeners();
    // });
  }

}

//перетащить в index js

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const addForm = document.querySelector('.add'); // поменять на форму
const editForm = document.querySelector('.user');

const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
