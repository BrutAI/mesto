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

const elementsItems = document.querySelector('.elements__items');

openGallery = element => {
  const templateGallery = document.querySelector('.template-gallery').content;
  const gallery = templateGallery.querySelector('.gallery').cloneNode(true);
  gallery.querySelector('.gallery__image').src = element.link;
  gallery.querySelector('.gallery__image').alt = element.name;
  gallery.querySelector('.gallery__caption').textContent = element.name;
  gallery.querySelector('.gallery__close').addEventListener('click', evt => evt.target.parentElement.parentElement.remove());
  document.querySelector('.root').append(gallery);
}

addItem = (element, place='end') => {
  console.log(element);
  const template = document.querySelector('.template').content;
  const elementsItem = template.querySelector('.elements__item').cloneNode(true);
  elementsItem.querySelector('.elements__image').src = element.link;
  elementsItem.querySelector('.elements__image').alt = element.name;
  elementsItem.querySelector('.elements__name').textContent = element.name;
  elementsItem.querySelector('.elements__like').addEventListener('click', evt => evt.target.classList.toggle('elements__like-active'));
  elementsItem.querySelector('.elements__remove').addEventListener('click', evt => evt.target.parentElement.remove());
  elementsItem.querySelector('.elements__image').addEventListener('click', () => openGallery(element));
  if (place!=='end') elementsItems.append(elementsItem);
    else elementsItems.prepend(elementsItem);
}

function closeModal() {
  popup.classList.remove('popup_opened');
  root.classList.remove('root_modal');
}

function openModalAddNew() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
  root.classList.add('root_modal');
}

addNewItem = evt => {
  evt.preventDefault();
  const titleInput = formNewItem.querySelector('.popup__input_value_title').value;
  const linkInput = formNewItem.querySelector('.popup__input_value_link').value;
  if (titleInput!==''&&linkInput!=='') addItem({name:titleInput, link:linkInput});
  closeModal();
}

const formNewItem = document.querySelector('.popup__form-new-item');
formNewItem.addEventListener('submit', addNewItem);

initialCards.forEach(addItem);

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



function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
  root.classList.remove('root_modal');
}

// formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
