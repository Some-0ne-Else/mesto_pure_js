export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setDocumentEventListner();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._removeDocumentEventListener();
      this.close();
    }
  }
  _overlayClose(evt) {
    if (this._popupSelector === evt.target) { this.close() }
  }
  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => this._overlayClose(evt));
  }
  _setDocumentEventListner(){
    document.addEventListener('keyup', this._handleEscClose);
  }
  _removeDocumentEventListener(){
     document.removeEventListener('keyup', this._handleEscClose);
  }
}
