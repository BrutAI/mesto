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
const userCloseButton = user.querySelector('.popup__close');

const add = document.querySelector('.add');
const titleInput = add.querySelector('.popup__input_value_title');
const linkInput = add.querySelector('.popup__input_value_link');
const addCloseButton = add.querySelector('.popup__close');

const gallery = document.querySelector('.gallery');
const image = gallery.querySelector('.popup__image');
const caption = gallery.querySelector('.popup__caption');
const galleryCloseButton = gallery.querySelector('.popup__close');

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

const createCard = element => {
  const template = document.querySelector('.template').content;
  const elementsItem = template.querySelector('.elements__item').cloneNode(true);
  const elementsImage = elementsItem.querySelector('.elements__image');
  const elementsName = elementsItem.querySelector('.elements__name');
  const elementsLike = elementsItem.querySelector('.elements__like');
  const elementsRemove = elementsItem.querySelector('.elements__remove');

  elementsImage.src = element.link;
  elementsImage.alt = element.name;
  elementsName.textContent = element.name;

  elementsImage.addEventListener('click', () => openGallery(element));
  elementsLike.addEventListener('click', evt => evt.target.classList.toggle('elements__like-active'));
  elementsRemove.addEventListener('click', evt => evt.target.parentElement.remove());

  return elementsItem;
}

const addItem = (element, place='end') => {
  const elementsItem = createCard(element);
  if (place!=='end') elementsItems.append(elementsItem);
    else elementsItems.prepend(elementsItem);
}

const addNewItem = evt => {
  evt.preventDefault();
  addItem({name:titleInput.value, link:linkInput.value});
  titleInput.value = '';
  linkInput.value = '';
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
  toggleButtonState([nameInput, jobInput], buttonElement, 'popup__submite_disabled');
  toggleModal(user);
});

addButton.addEventListener('click', () => {
  toggleModal(add);
});

add.addEventListener('submit', evt => addNewItem(evt));
user.addEventListener('submit', evt => editProfile(evt));
userCloseButton.addEventListener('click', () => toggleModal(user));
addCloseButton.addEventListener('click', () => toggleModal(add));
galleryCloseButton.addEventListener('click', () => toggleModal(gallery));

initialCards.forEach(addItem);

const closeOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) toggleModal(popup);
    });
  });
}

closeOverlay();
