import PopupWithImage from '../components/PopupWithImage.js'
export default class Card {
  constructor(title, url, handleCardClick, templateSelector) {
    this._title = title;
    this._url = url;
    this.handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');

    elementImage.src = this._url;
    elementTitle.textContent = this._title;
    elementImage.alt = this._title;

    /*selectors for listeners */
    const deleteButton = this._element.querySelector('.element__delete-button');
    const elementLike = this._element.querySelector('.element__like');
    /* adding handlers */
    deleteButton.addEventListener('click', this._deleteElementHandler);
    elementLike.addEventListener('click', this._likeButtonHandler);
    elementImage.addEventListener('click', () => { this.handleCardClick(this._title, this._url)});

    // return element outside
    return this._element;
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deleteElementHandler(evt) {
    const elementToDelete = evt.target.closest('.element');
    elementToDelete.remove();
  }
}
