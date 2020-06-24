import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._popupSelector = document.querySelector(popupSelector);
    this._submitHandler = submitHandler;
  }
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', (evt) => this.close());
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    this._popupSelector.addEventListener('mousedown', (evt) => this._overlayClose(evt));
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    })
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('.popup__container').reset();
  }
}
