import {configValidation,editPopupInstance,popupClassMarker} from './constants.js';
import Card from '../components/Card.js'

/* clear popup validation errors */
function clearValidationErrors(formElement, formInstance) {
  const allFormInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  allFormInputs.map(input => formInstance.hideInputError(formElement, input, configValidation.inputErrorClass, configValidation.errorClass));
}

/* mb need ref */
function removeEventListenerPopup(evt) {
  document.removeEventListener('keyup', closePopupAtEscape);
}

/* old close popup */
function closeAnyPopup(popupClassMarker) {
  const popupToClose = document.querySelector(`.${popupClassMarker}`);
  //removeEventListenerPopup();
  if (popupToClose != null) popupToClose.classList.remove(popupClassMarker);
}

/* new popup close by button */
function closeButtonHandler(evt) {
  editPopupInstance.close();
 }
function addEscClose() {
  document.addEventListener('keyup', escClose);
}

function escClose(evt) {
  editPopupInstance._handleEscClose(evt);
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

function addButtonHandler() {
  clearValidationErrors(popupAddForm, addForm);
  addPopupInstance.open();
  addEscClose();
}

/* add form handler */
function formAddHandler(evt) {
  evt.preventDefault();
  appendElement(popupName.value, popupUrl.value, elements);
  closeAnyPopup(popupClassMarker);
}
export {clearValidationErrors,
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
};
