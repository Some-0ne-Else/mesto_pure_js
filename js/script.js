<<<<<<< HEAD
=======
const initialElements = [
  {
    title: 'Сибуя',
    imageLink: './images/element__image_sibuya.jpg'
  },
  {
    title: 'Прага',
    imageLink: './images/element__image_praga.jpg'
  },
  {
    title: 'Иордания',
    imageLink: './images/element__image_iordaniya.jpg'
  },
  {
    title: 'Швейцария',
    imageLink: './images/element__image_switzerland.jpg'
  },
  {
    title: 'Греция',
    imageLink: './images/element__image_greece.jpg'
  },
  {
    title: 'Черногория',
    imageLink: './images/element__image_montenegro.jpg'
  }
];

/* rendering const */
const elements = document.querySelector('.elements'); // target for inserting new elements
const elementTemplate = document.querySelector('.element__template').content;

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
const popupEnlarge = document.querySelector('.popup-enlarge');
const popupImage = document.querySelector('.popup__image');
const allPopup = document.querySelectorAll('.popup');
const popupCaption = document.querySelector('.popup__caption');
const popupFullName = document.querySelector('#full-name');
const popupVocation = document.querySelector('#vocation');
const popupName = document.querySelector('#name');
const popupUrl = document.querySelector('#url');

/* config */
const popupClassMarker = 'popup_opened';
const configValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__action-button',
  inactiveButtonClass: 'popup__action-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/* handlers etc */
function deleteElementButtonHandler(evt) {
  const elementToDelete = evt.target.closest('.element');
  const elementImage = elementToDelete.querySelector('.element__image');
  const elementLike = elementToDelete.querySelector('.element__like');
  elementImage.removeEventListener('click', elementImageHandler);
  elementLike.removeEventListener('click', likeButtonHandler);
  evt.target.removeEventListener('click', deleteElementButtonHandler);
  elementToDelete.remove();
}

function clearValidationErrors(formElement) {
  const allFormInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  allFormInputs.map(input => hideInputError(formElement, input, configValidation.inputErrorClass, configValidation.errorClass));
}

function removeEventListenerFromPopup(evt) {
  document.removeEventListener('keyup', closePopupAtEscape);
}

function closeAnyPopup(popupClassMarker, currentForm) {
  const popupToClose = document.querySelector(`.${popupClassMarker}`);
  if (currentForm != null) { clearValidationErrors(currentForm); }
  removeEventListenerFromPopup();
  if (popupToClose != null) { popupToClose.classList.remove(popupClassMarker); }
}

function closePopupAtEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector(`.${popupClassMarker}`);
    const currentForm = currentPopup.querySelector(`${configValidation.formSelector}`)
    closeAnyPopup(popupClassMarker, currentForm);
  }
}

function openPopupAddEventListener(popup, popupClassMarker) {
  document.addEventListener('keyup', closePopupAtEscape);
  popup.classList.add(popupClassMarker);
}
function likeButtonHandler(evt) {
  evt.target.classList.toggle('element__like_active');
}

function elementImageHandler(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  openPopupAddEventListener(popupEnlarge, popupClassMarker);
}
function closePopupAtOverlayClick(evt) {
  if (this === evt.target) {
    const currentForm = evt.target.querySelector(configValidation.formSelector);
    closeAnyPopup(popupClassMarker, currentForm)
  }
}

function prepareNewElement(name, url) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const deleteButton = element.querySelector('.element__delete-button');
  const elementLike = element.querySelector('.element__like');
  const elementTitle = element.querySelector('.element__title');
  elementTitle.textContent = name;
  elementImage.src = url;
  elementImage.alt = elementTitle.textContent;
  deleteButton.addEventListener('click', deleteElementButtonHandler);
  elementLike.addEventListener('click', likeButtonHandler);
  elementImage.addEventListener('click', elementImageHandler);
  return element;
}

function appendInitialElement(name, url, targetElement) {
  targetElement.prepend(prepareNewElement(name, url));
}

function appendAllInitialElements() {
  initialElements.forEach((item, index) => appendInitialElement(initialElements[index].title, initialElements[index].imageLink, elements));
}

appendAllInitialElements();

/* EDIT FORM */

function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  closeAnyPopup(popupClassMarker);
}

function editButtonHandler() {
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  openPopupAddEventListener(popupEdit, popupClassMarker);
}

function closeButtonHandler(evt) {
  const currentForm = document.querySelector(`.${event.target.parentElement.classList[1]}`);
  closeAnyPopup(popupClassMarker, currentForm);
}

function clearPopupValues() {
  popupName.value = null;
  popupUrl.value = null;
}

function addButtonHandler() {
  clearPopupValues();
  openPopupAddEventListener(popupAdd, popupClassMarker);
}

function appendNewElement(popupName, popupUrl, targetElement) {
  targetElement.prepend(prepareNewElement(popupName, popupUrl));
}

function formAddHandler(evt) {
  evt.preventDefault();
  appendNewElement(popupName.value, popupUrl.value, elements);
  closeAnyPopup(popupClassMarker);
}

editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
popupAllCloseButtons.forEach(item => item.addEventListener('click', closeButtonHandler));
popupAddForm.addEventListener('submit', formAddHandler);
popupEditForm.addEventListener('submit', formEditHandler);
allPopup.forEach((item) => item.addEventListener('mousedown', closePopupAtOverlayClick));

>>>>>>> final-fixes
