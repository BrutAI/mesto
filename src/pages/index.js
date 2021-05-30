import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {initialCards} from '../components/initialCards.js';

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

function cardImageClickHandler(url, text) {
  popopWithImage.open(url, text)
}

const createCard = element => {
  const card = new Card(element, '.template', cardImageClickHandler);
  return card.generateCard();
}

// const addItem = (element, place='end') => {
//   const elementsItem = createCard(element);
//   if (place!=='end') elementsItems.append(elementsItem);
//     else elementsItems.prepend(elementsItem);
// }

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

function editFormSubmiteHandler(data) {
  userInfo.setUserInfo(data);
}

const editProfilePopup = new PopupWithForm('.user', editFormSubmiteHandler);
editProfilePopup.setEventListeners();

function addFormSubmiteHandler(data) {
  addItem(data);
}

const addImagePopup = new PopupWithForm('.add', addFormSubmiteHandler);
addImagePopup.setEventListeners();

const popopWithImage = new PopupWithImage('.gallery');
popopWithImage.setEventListeners();

editButton.addEventListener('click', () => {

  const data = userInfo.getUserInfo(nameProfile, jobProfile);

  nameInput.value = data.name;
  jobInput.value = data.job;

  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addImagePopup.open();
});

//initialCards.forEach(addItem);
const sectionCards = new Section({ initialCards, createCard }, '.elements__items');
sectionCards.renderItems();

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
