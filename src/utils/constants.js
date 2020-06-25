import FormValidator from '../components/FormValidator.js';
import montenegroImage from '../images/element__image_montenegro.jpg'
import greeceImage from '../images/element__image_greece.jpg'
import switzerlandImage from '../images/element__image_switzerland.jpg'
import iordaniyaImage from '../images/element__image_iordaniya.jpg'
import pragaImage from '../images/element__image_praga.jpg'
import sibuyaImage from '../images/element__image_sibuya.jpg'

const initialElements = [
  {
    title: 'Черногория',
    url: montenegroImage
  },
  {
    title: 'Греция',
    url: greeceImage
  },
  {
    title: 'Швейцария',
    url: switzerlandImage
  },
  {
    title: 'Иордания',
    url: iordaniyaImage
  },
  {
    title: 'Прага',
    url: pragaImage
  },
  {
    title: 'Сибуя',
    url: sibuyaImage
  },
];
/* page elements const */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileFullName = document.querySelector('.profile__full-name');
const profileVocation = document.querySelector('.profile__vocation');

/* popup const */
const popupFullName = document.querySelector('#full-name');
const popupVocation = document.querySelector('#vocation');

/* config */
const targetContainer = '.elements' // target for inserting new instances of Card
const cardTemplate = '.element__template'

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

export {
  initialElements,
  editButton,
  addButton,
  profileFullName,
  profileVocation,
  popupFullName,
  popupVocation,
  targetContainer,
  cardTemplate,
  configValidation,
  editForm,
  addForm,
};