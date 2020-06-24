import {
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
  popupClassMarker,
  elements,
  configValidation,
  editForm,
  addForm,
} from '../utils/constants.js';
import {
  clearValidationErrors,
  removeEventListenerPopup,
  closePopupAtOverlayClick,
  appendElement,
} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

/* creating instance of rendering logic */
const cardSection = new Section({
  items: initialElements,
  renderer: (item) => {
    const card = new Card(item.title, item.url, '.element__template');
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
}, '.elements');

/* rendering initial elements from array */
cardSection.renderItems();

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit', () => {
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
});
const addPopupInstance = new PopupWithForm('.popup_add', () => {
  appendElement(popupName.value, popupUrl.value, elements);
 });


function editButtonHandler() {
  clearValidationErrors(popupEditForm, editForm);
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  editPopupInstance.open();
}

function addButtonHandler() {
  clearValidationErrors(popupAddForm, addForm);
  addPopupInstance.open();
}

/*adding event listeners  */
editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
allPopup.forEach((item) => item.addEventListener('mousedown', closePopupAtOverlayClick));
editPopupInstance.setEventListeners();
addPopupInstance.setEventListeners();



// enable validation manualy for two forms like a described in brief
editForm.enableValidation();
addForm.enableValidation();
