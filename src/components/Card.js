export default class Card {
  constructor({name, link, likes, owner, _id}, myId, template, handleCardClick, handleRemove) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likesCounter = likes.length;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleRemove = handleRemove;
    this._isMyCard = owner._id === myId ? true : false;
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

  _setEventListeners() {
    const elementsImage = this._element.querySelector('.elements__image');
    const elementsLike = this._element.querySelector('.elements__like');
    const elementsLikesCounter = this._element.querySelector('.elements__like-counter');
    const elementsRemove = this._element.querySelector('.elements__remove');
    const elementsName = this._element.querySelector('.elements__name');

    elementsImage.src = this._link;
    elementsImage.alt = this._name;
    elementsRemove.id = this._id;
    elementsName.textContent = this._name;
    elementsLikesCounter.textContent = this._likesCounter;

    elementsImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    elementsLike.addEventListener('click', this._handleLike);

    if (this._isMyCard) {
      elementsRemove.addEventListener('click', () =>  this._handleRemove(this._id));
    } else {
      elementsRemove.remove();
    }
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    return this._element;
  }
}
