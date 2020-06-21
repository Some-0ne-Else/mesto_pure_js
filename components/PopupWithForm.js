import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector,callbackFunc){
    super (popupSelector)
    this._popupSelector = document.querySelector(popupSelector);
  }
  _getInputValues(){
    profileFullName.textContent = popupFullName.value;
    profileVocation.textContent = popupVocation.value;

  }
  setEventListeners(){
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  }

  close(){
    //так как при закрытии попапа форма должна ещё и сбрасываться.
  }
}
