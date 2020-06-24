export default class Card {
  constructor(title, url, templateSelector) {
    this._title = title;
    this._url = url;
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
    elementImage.addEventListener('click', this._elementImageHandler);

    // retun element outside
    return this._element;
  }
  _elementImageHandler(evt) {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = evt.target.alt;

    const popupEnlarge = document.querySelector('.popup-enlarge');
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        const popupToClose = document.querySelector('.popup_opened');
        if (popupToClose != null) popupToClose.classList.remove('popup_opened');
      }
    });
    popupEnlarge.classList.add('popup_opened');
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deleteElementHandler(evt) {
    const elementToDelete = evt.target.closest('.element');
    const elementImage = elementToDelete.querySelector('.element__image');
    const elementLike = elementToDelete.querySelector('.element__like');
    elementImage.removeEventListener('click', this._elementImageHandler);
    elementLike.removeEventListener('click', this._likeButtonHandler);
    evt.target.removeEventListener('click', this._deleteElementHandler);
    elementToDelete.remove();
  }
}

