export default class Popup{
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }
  open(){
    this._popupSelector.classList.add('popup_opened');
  }
  close(){
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
     this.close();
    }
  }
  setEventListeners(){
   const closeButton = this._popupSelector.querySelector('.popup__close-button');
   closeButton.addEventListener('click', this.close);
   document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  }
}
