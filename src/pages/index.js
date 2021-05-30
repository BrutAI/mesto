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
const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popupProfile');
const formProfile = popupProfile.querySelector('.popup__form');
const inputProfileName = popupProfile.querySelector('.popup__input_value_name');
const inputProfileJob = popupProfile.querySelector('.popup__input_value_job');

const popupAddCard = document.querySelector('.popupAddCard');
const formAddCard = popupAddCard.querySelector('.popup__form');

function cardImageClickHandler(url, text) {
  popopWithImage.open(url, text)
}

const createCard = element => {
  const card = new Card(element, '.template', cardImageClickHandler);
  return card.generateCard();
}

const sectionCards = new Section({ items:initialCards, renderer: (dataCard) => {
      const newCardElement = createCard(dataCard);
      sectionCards.addItem(newCardElement);
    }
  }, '.elements__items');
sectionCards.renderItems();

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

function submitFormProfile(data) {
  userInfo.setUserInfo(data);
}

const profilePopupWithForm = new PopupWithForm('.popupProfile', submitFormProfile);
profilePopupWithForm.setEventListeners();

function submitNewCard(data) {
  sectionCards.addItem(createCard(data), true);
}

const addCardPopupWithForm = new PopupWithForm('.popupAddCard', submitNewCard);
addCardPopupWithForm.setEventListeners();

const popopWithImage = new PopupWithImage('.gallery');
popopWithImage.setEventListeners();

editProfileButton.addEventListener('click', () => {

  const data = userInfo.getUserInfo(nameProfile, jobProfile);

  inputProfileName.value = data.name;
  inputProfileJob.value = data.job;
  editFormValidator.resetValidation();
  profilePopupWithForm.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addCardPopupWithForm.open();
});

// добавляем валидацию

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const addFormValidator = new FormValidator(settings, formAddCard);
const editFormValidator = new FormValidator(settings, formProfile);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
