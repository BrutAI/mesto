import {gallery, image, caption, toggleModal} from './utils.js';

class Card {
  constructor({name, link}, template) {
    this._link = link;
    this._name = name;
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

  _handleLike(evt) {
    evt.target.classList.toggle('elements__like-active');
  }

  _handleRemove() {
    this._element.remove();
  }

  _handleOpenGallery() {
    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;
    toggleModal(gallery);
  }

  _setEventListeners() {
    const elementsImage = this._element.querySelector('.elements__image');
    const elementsLike = this._element.querySelector('.elements__like');
    const elementsRemove = this._element.querySelector('.elements__remove');
    const elementsName = this._element.querySelector('.elements__name');

    elementsImage.src = this._link;
    elementsImage.alt = this._name;
    elementsName.textContent = this._name;

    elementsImage.addEventListener('click', () => this._handleOpenGallery());
    elementsLike.addEventListener('click', this._handleLike);
    elementsRemove.addEventListener('click', () =>  this._handleRemove());
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
