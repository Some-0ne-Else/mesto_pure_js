import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
  }

  open(evt) {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = evt.target.alt;
    this._popupSelector.classList.add('popup_opened');
  }
}
