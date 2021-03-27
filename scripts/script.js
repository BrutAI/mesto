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
  const elementsItems = document.querySelector('.elements__items');
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

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
  document.querySelector('.root').classList.toggle('root_modal');
}

addNewItem = evt => {
  evt.preventDefault();
  const titleInput = document.querySelector('.add__input_value_title').value;
  const linkInput = document.querySelector('.add__input_value_link').value;
  if (titleInput!==''&&linkInput!=='') addItem({name:titleInput, link:linkInput});
  document.querySelector('.add__input_value_title').value = '';
  document.querySelector('.add__input_value_link').value = '';
  toggleModal(document.querySelector('.add'));
}

editProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  toggleModal(user);
}

const add = document.querySelector('.add');
const addForm = add.querySelector('.add__form');
add.querySelector('.popup__close').addEventListener('click', function(){toggleModal(add)});
addForm.addEventListener('submit', addNewItem);
document.querySelector('.profile__add-button').addEventListener('click', function(){toggleModal(add)});


const user = document.querySelector('.user');
const userForm = user.querySelector('.user__form');
user.querySelector('.popup__close').addEventListener('click', function(){toggleModal(user)});
userForm.addEventListener('submit', editProfile);
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = userForm.querySelector('.user__input_value_name');
let jobInput = userForm.querySelector('.user__input_value_job');
document.querySelector('.profile__edit-button').addEventListener('click', function(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  toggleModal(user);
});

initialCards.forEach(addItem);

