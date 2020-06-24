import {
  initialElements,
  editButton,
  addButton,
  profileFullName,
  profileVocation,
  popupEditForm,
  popupAddForm,
  popupFullName,
  popupVocation,
  targetContainer,
  cardTemplate,
  editForm,
  addForm,
} from '../utils/constants.js';
import {
  clearValidationErrors,
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
    const card = new Card(item.title, item.url, cardTemplate);
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
}, targetContainer);

/* rendering initial elements from array */
cardSection.renderItems();

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit', (formData) => {
  profileFullName.textContent = formData.fullname;
  profileVocation.textContent = formData.vocation;
});
const addPopupInstance = new PopupWithForm('.popup_add', (formData) => {
  const card = new Card(formData.name, formData.url, cardTemplate)
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
 });



function editButtonHandler() {
  clearValidationErrors(popupEditForm, editForm);
  //loading data form page to popup
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
editPopupInstance.setEventListeners();
addPopupInstance.setEventListeners();

// enable validation manualy for two forms like a described in brief
editForm.enableValidation();
addForm.enableValidation();
