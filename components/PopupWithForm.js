import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._popupSelector = document.querySelector(popupSelector);
    this._submitHandler = submitHandler;
  }
  _getInputValues() {
      // достаём все элементы полей
      this._inputList = this._element.querySelectorAll('.form__input');

      // создаём пустой объект
      this._formValues = {};

      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      // возвращаем объект значений
      return this._formValues;
  }
  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', (evt) => this.close());
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler()
      this.close();
    })
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('.popup__container').reset();
  }

}
