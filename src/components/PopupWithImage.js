import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(title, url) {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = url;
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = title;
    super.open()
  }
}
