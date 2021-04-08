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

const gallery = document.querySelector('.gallery');
const galleryImage = gallery.querySelector('.gallery__image');
const galleryCaption = gallery.querySelector('.gallery__caption');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const user = popup.querySelector('.user');
const nameInput = user.querySelector('.popup__input_value_name');
const jobInput = user.querySelector('.popup__input_value_job');

const add = popup.querySelector('.add');

const openModal = (modal) => {
  modal === 'user' ?  user.classList.add('popup__container_opened') : user.classList.remove('popup__container_opened');
  modal === 'add' ?  add.classList.add('popup__container_opened') : add.classList.remove('popup__container_opened');
  modal === 'gallery' ?  gallery.classList.add('gallery_opened') : gallery.classList.remove('gallery_opened');
  popup.classList.add('popup_opened');
};

const closeModal = () => popup.classList.remove('popup_opened');

// document.querySelector('.root').classList.toggle('root_modal');
// убрал, но он был нужен что бы при октрытии модального окна фон не скролился, так же круче было)

const openGallery = element => {
  galleryImage.src = element.link;
  galleryImage.alt = element.name;
  galleryCaption.textContent = element.name;
  gallery.classList.add('gallery_opened');
  openModal('gallery');
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
  const elementsItems = document.querySelector('.elements__items');
  const elementsItem = createCard(element);
  if (place!=='end') elementsItems.append(elementsItem);
    else elementsItems.prepend(elementsItem);
}

const addNewItem = evt => {
  evt.preventDefault();
  const titleInput = document.querySelector('.popup__input_value_title');
  const linkInput = document.querySelector('.popup__input_value_link');
  if (titleInput.value!==''&&linkInput.value!=='') addItem({name:titleInput.value, link:linkInput.value});
  titleInput.value = '';
  linkInput.value = '';
  closeModal();
}

const editProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal();
}

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  user.classList.add('popup__container_opened');
  openModal('user');
});

addButton.addEventListener('click', () => {
  add.classList.add('popup__container_opened');
  openModal('add');
});

add.addEventListener('submit', evt => addNewItem(evt));
user.addEventListener('submit', evt => editProfile(evt));
closeButton.addEventListener('click', closeModal);

initialCards.forEach(addItem);



