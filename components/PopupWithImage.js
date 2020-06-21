import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
 constructor(popupSelector){
   super(popupSelector);
  this._popupSelector = document.querySelector(popupSelector);
 }
  open(evt){
 console.log(evt);
  }

}
