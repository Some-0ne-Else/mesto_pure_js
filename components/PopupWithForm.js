import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector){
    super (popupSelector)
    this._popupSelector = document.querySelector(popupSelector);
  }
  _getInputValues(){

  }
  setEventListeners(){
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
   closeButton.addEventListener('click', (evt) => this.close());
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log("form send")
     })
  }
  close(){
    const popupToClose = document.querySelector('.popup_opened');
    if (popupToClose != null) {popupToClose.classList.remove('popup_opened');}
    this._popupSelector.querySelector('.popup__container').reset();
  }

}
