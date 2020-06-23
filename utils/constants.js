import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
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

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit');
const addPopupInstance = new PopupWithForm('.popup_add');

/* config */
const popupClassMarker = 'popup_opened';
const elements = document.querySelector('.elements'); // target for inserting new instances of Card

/*validation const */
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

export {
  initialElements,
  editButton,
  addButton,
  profileFullName,
  profileVocation,
  popupEditForm,
  popupAddForm,
  allPopup,
  popupFullName,
  popupVocation,
  popupName,
  popupUrl,
  editPopupInstance,
  addPopupInstance,
  popupClassMarker,
  elements,
  configValidation,
  editForm,
  addForm,
  sectionInstance,
};
