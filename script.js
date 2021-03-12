let editButton = document.querySelector('.profile__edit-button');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');


function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
});
