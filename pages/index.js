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
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

/* creating instances of rendering logic */
const enlargePopupInstance = new PopupWithImage('.popup-enlarge');

const userData = new UserInfo( {fullname:profileFullName, vocation:profileVocation});
const cardSection = new Section({
  items: initialElements,
  renderer: (item) => {
    const card = new Card(item.title, item.url, enlargePopupInstance.open.bind(enlargePopupInstance), cardTemplate);
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
}, targetContainer);

/* rendering initial elements from array */
cardSection.renderItems();

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit', (formData) => {
  userData.setUserInfo(formData);
});
const addPopupInstance = new PopupWithForm('.popup_add', (formData) => {
  const card = new Card(formData.name, formData.url, enlargePopupInstance.open.bind(enlargePopupInstance), cardTemplate)
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
 });

function editButtonHandler() {
  clearValidationErrors(popupEditForm, editForm);
  popupFullName.value =  userData.getUserInfo().name
  popupVocation.value = userData.getUserInfo().vocation
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
enlargePopupInstance.setEventListeners();
// enable validation manualy for two forms like a described in the brief 7
editForm.enableValidation();
addForm.enableValidation();
