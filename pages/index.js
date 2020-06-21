import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

//const imagePopup = new PopupWithImage(".popup-enlarge");
//imagePopup.open();


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
const popupEditForm = document.querySelector('.popup__container_edit');
const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__container_add');

const allPopup = document.querySelectorAll('.popup');
const popupFullName = document.querySelector('#full-name');
const popupVocation = document.querySelector('#vocation');
const popupName = document.querySelector('#name');
const popupUrl = document.querySelector('#url');

/* making instances of clases */
const universalPopupInstance = new Popup('.popup'); //used for general logic of handeling popups
const editPopupInstance = new PopupWithForm('.popup_edit');
const addPopupInstance = new Popup('.popup_add');

/* config */
const popupClassMarker = 'popup_opened';
const elements = document.querySelector('.elements'); // target for inserting new instances of Card

const configValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__action-button',
  inactiveButtonClass: 'popup__action-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const editForm = new FormValidator(configValidation, ".popup__container_edit");
const addForm = new FormValidator(configValidation, ".popup__container_add");

/* In case of using this method we should make it public */
function clearValidationErrors(formElement, formInstance) {
  const allFormInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  allFormInputs.map(input => formInstance.hideInputError(formElement, input, configValidation.inputErrorClass, configValidation.errorClass));
}

function removeEventListenerFromPopup(evt) {
  document.removeEventListener('keyup', closePopupAtEscape);
}

/* old close popup */
function closeAnyPopup(popupClassMarker) {
  const popupToClose = document.querySelector(`.${popupClassMarker}`);
  //removeEventListenerFromPopup();
  if (popupToClose != null) popupToClose.classList.remove(popupClassMarker);
}

function addEscClose() {
  document.addEventListener('keyup', escClose);
}

function escClose(evt) {
  universalPopupInstance._handleEscClose(evt);
}

function closePopupAtOverlayClick(evt) {
  if (this === evt.target) {
    const currentForm = evt.target.querySelector(configValidation.formSelector);
    //universalPopupInstance._handleEscClose(evt);
    closeAnyPopup(popupClassMarker, currentForm)
  }
}

/*need a refactor with clases later */
function appendElement(name, url, targetElement) {
  const card = new Card(name, url, '.element__template')
  const cardElement = card.generateCard();
  targetElement.prepend(cardElement);
}

/* creating instance of rendering logic */
const sectionInstance = new Section({
  items: initialElements,
  renderer: (item) => {
    const card = new Card(item.title, item.url, '.element__template');
    const cardElement = card.generateCard();
    sectionInstance.addItem(cardElement);
  }
},
  '.elements');

/* rendering initial elements from array */
sectionInstance.renderItems();


/* handler of edit form */
function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
closeAnyPopup(popupClassMarker);
}


function editButtonHandler() {
  clearValidationErrors(popupEditForm, editForm);
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  editPopupInstance.open();
  addEscClose();
}

/* closing any popup by button */
function closeButtonHandler(evt) {
  universalPopupInstance.close();
}

function clearPopupValues() {
  popupName.value = null;
  popupUrl.value = null;
}

function addButtonHandler() {
  clearValidationErrors(popupAddForm, addForm);
  clearPopupValues();
  addPopupInstance.open();
  addEscClose();
}

/* add form handler */
function formAddHandler(evt) {
  evt.preventDefault();
  appendElement(popupName.value, popupUrl.value, elements);
  closeAnyPopup(popupClassMarker);
}

editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
popupAddForm.addEventListener('submit', formAddHandler);
popupEditForm.addEventListener('submit', formEditHandler);
allPopup.forEach((item) => item.addEventListener('mousedown', closePopupAtOverlayClick));
editPopupInstance.setEventListeners();
addPopupInstance.setEventListeners();

// enable validation manualy for two forms like a described in brief
editForm.enableValidation();
addForm.enableValidation();
