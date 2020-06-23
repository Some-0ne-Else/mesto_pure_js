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
  editPopupInstance,
  addPopupInstance,
  popupClassMarker,
  elements,
  editForm,
  addForm,
  sectionInstance,
} from '../utils/constants.js';
import {clearValidationErrors,
  removeEventListenerPopup,
  closeAnyPopup,
  closeButtonHandler,
  addEscClose,
  escClose,
  closePopupAtOverlayClick,
  appendElement,
  formEditHandler,
  editButtonHandler,
  addButtonHandler,
  formAddHandler,
} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

/* rendering initial elements from array */
sectionInstance.renderItems();

/*adding event listeners  */
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
