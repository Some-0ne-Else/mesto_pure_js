import Card from '../js/Card.js';
import FormValidator from '../js/FormValidator.js'

const initialElements = [
  {
    title: 'Сибуя',
    url: './images/element__image_sibuya.jpg'
  },
  {
    title: 'Прага',
    url: './images/element__image_praga.jpg'
  },
  {
    title: 'Иордания',
    url: './images/element__image_iordaniya.jpg'
  },
  {
    title: 'Швейцария',
    url: './images/element__image_switzerland.jpg'
  },
  {
    title: 'Греция',
    url: './images/element__image_greece.jpg'
  },
  {
    title: 'Черногория',
    url: './images/element__image_montenegro.jpg'
  }
];

/* page elements const */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileFullName = document.querySelector('.profile__full-name');
const profileVocation = document.querySelector('.profile__vocation');

/* popup const */
const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = document.querySelector('.popup__container_edit');
const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__container_add');
const popupAllCloseButtons = document.querySelectorAll('.popup__close-button');

const allPopup = document.querySelectorAll('.popup');
const popupFullName = document.querySelector('#full-name');
const popupVocation = document.querySelector('#vocation');
const popupName = document.querySelector('#name');
const popupUrl = document.querySelector('#url');

/* config */
const popupClassMarker = 'popup_opened';
const cardTemplate = '.element__template'
const elements = document.querySelector('.elements'); // target for inserting new instances of Card
const configValidation = { //old config
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__action-button',
  inactiveButtonClass: 'popup__action-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/* handlers etc */

/* legacy code
function clearValidationErrors(formElement) {
  const allFormInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  allFormInputs.map(input => hideInputError(formElement, input, configValidation.inputErrorClass, configValidation.errorClass));
}
*/
function removeEventListenerFromPopup(evt) {
  document.removeEventListener('keyup', closePopupAtEscape);
}

function closeAnyPopup(popupClassMarker, currentForm) {
  const popupToClose = document.querySelector(`.${popupClassMarker}`);
  removeEventListenerFromPopup();
 if (popupToClose != null)  popupToClose.classList.remove(popupClassMarker);
}

function closePopupAtEscape(evt) {
  if (evt.key === 'Escape') {
    closeAnyPopup(popupClassMarker);
  }
}

function openPopupAddEventListener(popup, popupClassMarker) {
  document.addEventListener('keyup', closePopupAtEscape);
  popup.classList.add(popupClassMarker);
}

function closePopupAtOverlayClick(evt) {
  if (this === evt.target) {
    const currentForm = evt.target.querySelector(configValidation.formSelector);
    closeAnyPopup(popupClassMarker, currentForm)
  }
}

function appendElement(name, url, targetElement) {
  const card = new Card(name,url,'.element__template')
  const cardElement = card.generateCard();
  targetElement.prepend(cardElement);
}

function appendInitialElements () {
  initialElements.forEach((item) => {
    // Creating instance of Card class
    const card = new Card(item.title, item.url,'.element__template');
    // Filling instance with data and adding to DOM
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  });
  }
  appendInitialElements();

function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  closeAnyPopup(popupClassMarker);
}

function editButtonHandler() {
  //clearValidationErrors(popupEditForm);
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  openPopupAddEventListener(popupEdit, popupClassMarker);
}

function closeButtonHandler(evt) {
  closeAnyPopup(popupClassMarker);
}

function clearPopupValues() {
  popupName.value = null;
  popupUrl.value = null;
}

function addButtonHandler() {
 // clearValidationErrors(popupAddForm);
  clearPopupValues();
  openPopupAddEventListener(popupAdd, popupClassMarker);
}

function formAddHandler(evt) {
  evt.preventDefault();
  appendElement(popupName.value, popupUrl.value, elements);
  closeAnyPopup(popupClassMarker);
}

editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
popupAllCloseButtons.forEach(item => item.addEventListener('click', closeButtonHandler));
popupAddForm.addEventListener('submit', formAddHandler);
popupEditForm.addEventListener('submit', formEditHandler);
allPopup.forEach((item) => item.addEventListener('mousedown', closePopupAtOverlayClick));

//пока вручную, для каждой формы согласно заданию
const editForm = new FormValidator(configValidation,".popup__container_edit");
const addForm = new FormValidator(configValidation,".popup__container_add");
editForm.enableValidation();
addForm.enableValidation();
