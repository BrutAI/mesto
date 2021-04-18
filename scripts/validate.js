const showInputError = (formElement, inputElement, errorMessage, dict) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dict.errorClass);
  inputElement.classList.add(dict.inputErrorClass);
}

const hideInputError = (formElement, inputElement, dict) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(dict.errorClass);
  inputElement.classList.remove(dict.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, dict) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, dict);
  } else {
    hideInputError(formElement, inputElement, dict);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, dict) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(dict.inputSelector));
  const buttonElement = formElement.querySelector(dict.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, dict);
      toggleButtonState(inputList, buttonElement, dict.inactiveButtonClass);
    });
  });

  toggleButtonState(inputList, buttonElement, dict.inactiveButtonClass);
}

const enableValidation = (dict) => {
  const formList = Array.from(document.querySelectorAll(dict.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, dict);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
});

