import {toggleModal} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const elementsItems = document.querySelector('.elements__items');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const user = document.querySelector('.user');
const userForm = user.querySelector('.popup__form');
const nameInput = user.querySelector('.popup__input_value_name');
const jobInput = user.querySelector('.popup__input_value_job');

const add = document.querySelector('.add');
const addForm = add.querySelector('.popup__form');
const titleInput = add.querySelector('.popup__input_value_title');
const linkInput = add.querySelector('.popup__input_value_link');

const createCard = element => {
  const card = new Card(element, '.template');
  return card.generateCard();
}

const addItem = (element, place='end') => {
  const elementsItem = createCard(element);
  if (place!=='end') elementsItems.append(elementsItem);
    else elementsItems.prepend(elementsItem);
}

const addNewItem = evt => {
  evt.preventDefault();
  addItem({name:titleInput.value, link:linkInput.value});
  addForm.reset();
  toggleModal(add);
}

const editProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  toggleModal(user);
}

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  toggleModal(user);
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  toggleModal(add);
});

add.addEventListener('submit', evt => addNewItem(evt));
user.addEventListener('submit', evt => editProfile(evt));

initialCards.forEach(addItem);

const closeOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) toggleModal(popup);
      if (evt.target.classList.contains('popup__close')) toggleModal(popup);
    });
  });
}

closeOverlay();

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, userForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
