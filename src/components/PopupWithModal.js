import Popup from './Popup.js';

export default class PopupWithModal extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._submitHandler = submitHandler;

  }
  open(cardId, e){
    this._cardId = cardId;
    this._e = e;
    super.open()
  }
  setEventListeners() {
    super.setEventListeners()
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._e, this._cardId);
      this.close();
    })
  }
}
