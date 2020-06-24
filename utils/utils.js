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
} from './constants.js';

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

/*old */
function closePopupAtOverlayClick(evt) {
  if (this === evt.target) {
    const currentForm = evt.target.querySelector(configValidation.formSelector);
    closeAnyPopup(popupClassMarker, currentForm)
  }
}

 /*func for adding Card directly to DOM */
function appendElement(name, url, targetElement) {
  const card = new Card(name, url, '.element__template')
  const cardElement = card.generateCard();
  targetElement.prepend(cardElement);
}

export {clearValidationErrors,
  removeEventListenerPopup,
  closePopupAtOverlayClick,
  appendElement,
};
