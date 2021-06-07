import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


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

const popupConfirm = document.querySelector('.popupConfirm');
const inputImageId = popupConfirm.querySelector('.imageId');
//const formConfirm = popupConfirm.querySelector('.popup__form');

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__job', avatar: '.profile__avatar' });

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'd3391cb4-56c4-4b0d-93af-8327d7fa2e17'
});

function cardImageClickHandler(url, text) {
  popopWithImage.open(url, text)
}

function cardRemoveHandler(id) {
  inputImageId.value = id;
  confirmPopupWithForm.open();
}

function submitRemove() {
  const id = inputImageId.value;
  console.log(sectionCards);
  // api.removeCard(id)
  //   .then(() => {
  //     document.querySelector(`${id}`).remove();
  //   })
  //console.log(inputImageId.value);
  confirmPopupWithForm.close();
}

const confirmPopupWithForm = new PopupWithForm('.popupConfirm', submitRemove);
confirmPopupWithForm.setEventListeners();

const createCard = (element, myId) => {
  const card = new Card(element, myId, '.template', cardImageClickHandler, cardRemoveHandler);
  return card.generateCard();
}

const sectionCards = new Section({ renderer: (dataCard, myId) => {
  const newCardElement = createCard(dataCard, myId);
  sectionCards.addItem(newCardElement);
  }
}, '.elements__items');

let myId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, items]) => {
    userInfo.setUserInfo(user);
    myId = user._id;
    sectionCards.renderItems(items, myId);
  })

function submitFormProfile(data) {
  api.setUserInfo(data)
    .then((user) => {
      userInfo.setUserInfo(user);
    });
}

const profilePopupWithForm = new PopupWithForm('.popupProfile', submitFormProfile);
profilePopupWithForm.setEventListeners();

function submitNewCard(data) {
  api.addNewCard(data)
    .then((card) => {
      sectionCards.addItem(createCard(card, myId), true);
    });
}

const addCardPopupWithForm = new PopupWithForm('.popupAddCard', submitNewCard);
addCardPopupWithForm.setEventListeners();

const popopWithImage = new PopupWithImage('.gallery');
popopWithImage.setEventListeners();

editProfileButton.addEventListener('click', () => {

  const data = userInfo.getUserInfo(nameProfile, jobProfile);

  inputProfileName.value = data.name;
  inputProfileJob.value = data.about;
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
