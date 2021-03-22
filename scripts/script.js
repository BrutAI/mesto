let root = document.querySelector('.root');

let editButton = document.querySelector('.profile__edit-button');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');

function openModal() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
  root.classList.add('root_modal');
}

function closeModal() {
  popup.classList.remove('popup_opened');
  root.classList.remove('root_modal');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
  root.classList.remove('root_modal');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
