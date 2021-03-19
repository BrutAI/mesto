let root = document.querySelector('.root');

let editButton = document.querySelector('.profile__edit-button');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

function openModal(evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
  root.classList.toggle('root-modal'); // чтобы фон не скроллился
}

formElement.addEventListener('submit', function(evt) {
  openModal(evt);
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
});

editButton.addEventListener('click', function(evt) {
  openModal(evt);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

closeButton.addEventListener('click', function(evt) {
  openModal(evt);
});
