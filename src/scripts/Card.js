export default class Card {
  constructor({name, link}, template, handleCardClick) {
    this._link = link;
    this._name = name;
    this._template = template;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    const elementsImage = this._element.querySelector('.elements__image');
    const elementsLike = this._element.querySelector('.elements__like');
    const elementsRemove = this._element.querySelector('.elements__remove');
    const elementsName = this._element.querySelector('.elements__name');

    elementsImage.src = this._link;
    elementsImage.alt = this._name;
    elementsName.textContent = this._name;

    elementsImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    elementsLike.addEventListener('click', this._handleLike);
    elementsRemove.addEventListener('click', () =>  this._handleRemove());
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    return this._element;
  }
}
