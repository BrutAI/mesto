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
const nameInput = user.querySelector('.popup__input_value_name');
const jobInput = user.querySelector('.popup__input_value_job');
const userButtonElement = user.querySelector('.popup__submite');

const add = document.querySelector('.add');
const addForm = add.querySelector('.popup__form');
const titleInput = add.querySelector('.popup__input_value_title');
const linkInput = add.querySelector('.popup__input_value_link');
const addButtonElement = add.querySelector('.popup__submite');

const gallery = document.querySelector('.gallery');
const image = gallery.querySelector('.popup__image');
const caption = gallery.querySelector('.popup__caption');

const addEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    toggleModal(popup);
  }
}

const toggleModal = (modal) => {
  if (modal.classList.contains('popup_opened')) {
    document.removeEventListener('keydown', addEscHandler);
    modal.classList.remove('popup_opened');
  } else {
    document.addEventListener('keydown', addEscHandler);
    modal.classList.add('popup_opened');
  }
}

const openGallery = element => {
  image.src = element.link;
  image.alt = element.name;
  caption.textContent = element.name;
  toggleModal(gallery);
}

class Card {
  constructor(element, template) {
    this._link = element.link;
    this._name = element.name;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const _elementsImage = this._element.querySelector('.elements__image');
    const _elementsName = this._element.querySelector('.elements__name');
    const _elementsLike = this._element.querySelector('.elements__like');
    const _elementsRemove = this._element.querySelector('.elements__remove');

    _elementsImage.src = this._link;
    _elementsImage.alt = this._name;
    _elementsName.textContent = this._name;

    _elementsImage.addEventListener('click', () => openGallery(this._element));
    _elementsLike.addEventListener('click', evt => evt.target.classList.toggle('elements__like-active'));
    _elementsRemove.addEventListener('click', evt => evt.target.parentElement.remove());

    return this._element;
  }
}

const addItem = (element, place='end') => {
  const card = new Card(element, '.template');
  const elementsItem = card.generateCard();
  if (place!=='end') elementsItems.append(elementsItem);
    else elementsItems.prepend(elementsItem);
}

const addNewItem = evt => {
  evt.preventDefault();
  addItem({name:titleInput.value, link:linkInput.value});
  addForm.reset();
  toggleButtonState([nameInput, jobInput], addButtonElement, 'popup__submite-disabled');
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
  const buttonElement = user.querySelector('.popup__submite');
  toggleButtonState([nameInput, jobInput], userButtonElement, 'popup__submite-disabled');
  toggleModal(user);
});

addButton.addEventListener('click', () => {
  toggleModal(add);
});

add.addEventListener('submit', evt => addNewItem(evt));
user.addEventListener('submit', evt => editProfile(evt));

initialCards.forEach(addItem);

const closeOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) toggleModal(popup);
      if (evt.target.classList.contains('popup__close')) toggleModal(popup);
    });
  });
}

closeOverlay();

