export const gallery = document.querySelector('.gallery');
export const image = gallery.querySelector('.popup__image');
export const caption = gallery.querySelector('.popup__caption');

const addEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    toggleModal(popup);
  }
}

export const toggleModal = (modal) => {
  if (modal.classList.contains('popup_opened')) {
    document.removeEventListener('keydown', addEscHandler);
    modal.classList.remove('popup_opened');
  } else {
    document.addEventListener('keydown', addEscHandler);
    modal.classList.add('popup_opened');
  }
}
