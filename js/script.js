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


/* Алексей, спасибо за Ваши замечания, прямо скажу был занят другим дедлайном по другому pro bono проекту "Раклечится", поэтому фиксы были достаточно поверхностные, сейчас сделал с большей проработкой деталей*/


/*константы для рендеринга */
const elements = document.querySelector('.elements'); //цель для вставки новых элементов на страницу
const elementTemplate = document.querySelector('.element__template').content;

/*константы элементов страницы */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileFullName = document.querySelector(".profile__full-name");
const profileVocation = document.querySelector(".profile__vocation");

/* константы попапов*/
const popupEdit = document.querySelector(".popup_edit");
const popupEditForm = document.querySelector(".popup__container_edit");
const allCloseButtons = document.querySelectorAll(".popup__close-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = document.querySelector(".popup__container_add");
const popupEnlarge = document.querySelector(".popup-enlarge");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupFullName = document.querySelector("#full-name");
const popupVocation = document.querySelector("#vocation");
const popupName = document.querySelector("#name");
const popupUrl = document.querySelector("#url");

/* зачатки конфига */
const popupClassMarker = "popup_opened";
const configValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__action-button',
  inactiveButtonClass: 'popup__action-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
/* Как чувстовал что скрипач не нужен, поэтому uid сделал отдельным бранчем */
const allInputsErrors = document.querySelectorAll(`.${configValidation.errorClass}`.match(/\D+\_{2,2}[a-z-]+/))
const allPopup = document.querySelectorAll(".popup");

// функция очищающая вывод ошибок при закрыти попапов
function clearValidationErrors() {
  allInputsErrors.forEach((item) => item.textContent = "")
  const allInputs = document.querySelectorAll(`.${configValidation.inputErrorClass}`);
  allInputs.forEach((item) => item.classList.remove(configValidation.inputErrorClass));
}
//Фунция закрытия попапа
function closeAnyPopup(popupClassMarker) {
  const popupToClose = document.querySelector(`.${popupClassMarker}`);
  clearValidationErrors();
  removeEvLisFromPopup();
  if(popupToClose != null){popupToClose.classList.remove(popupClassMarker)} /* избавимся от ошибок в консоли возникающих из-за щелчков ЛКМ во время анимации */
}

//функция закрытия попапов по нажатию на Esc
function closePopupAtEscape(evt) {
  if (evt.key === 'Escape') {
    closeAnyPopup(popupClassMarker);
  }
};

// функция закрытия попапа по клику на оверлее
function closePopupAtOverlayClick(evt) {
  if (this === evt.target) { closeButtonHandler(); }
}

//Функция снятия слушателей
function removeEvLisFromPopup(evt) {
  document.removeEventListener('keyup', closePopupAtEscape);
}

/* РЕНДЕРИНГ ИЗНАЧАЛЬНОГО СОСТОЯНИЯ (ДАННЫЕ ИЗ МАССИВА) */

// функция подготовки к вставке одного элемента
function prepareInitialElement(item) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const deleteButton = element.querySelector(".element__delete-button");
  const elementLike = element.querySelector(".element__like");
  const elementTitle = element.querySelector('.element__title');
  // наполняем содержимым
  elementImage.src = item.imageLink;
  elementTitle.textContent = item.title;
  elementImage.alt = elementTitle.textContent; //alt будет содержать значение заголовка элемента (карточки)
  deleteButton.addEventListener('click', deleteElementButtonHandler);
  elementLike.addEventListener("click", likeButtonHandler);
  elementImage.addEventListener("click", elementImageHandler);
  return element;
}
//функция непосредственного добавления одного элемента на страницу принимает пар1 элемент пар2 цель вставки
function appendInitialElement(element, targetElement) {
  targetElement.prepend(prepareInitialElement(element));  // отображаем на странице
}

//функция добавления изначальных элементов на страницу принимает пар1 элемент пар2 куда вставляем
function appendAllInitialElements() {
  initialElements.forEach(element => appendInitialElement(element, elements));
}

// Вызов функции добавления изначальных элементов
appendAllInitialElements();

/* ФОРМА РЕДАКТИРОВАНИЯ */

//функция обработчик формы редактирования
function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  closeAnyPopup(popupClassMarker);
}

/*функция открытия попап и добавления слушателей для закрытия */
function openPopupAddEl(popup, popupClassMarker){
  document.addEventListener('keyup', closePopupAtEscape);
  popup.classList.add(popupClassMarker);
}

//функция обработки нажатия на кнопку редактировать
function editButtonHandler() {
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  openPopupAddEl(popupEdit,popupClassMarker);
}

//функция обработки нажатия на кнопку закрытия попапа
function closeButtonHandler(evt) {
  closeAnyPopup(popupClassMarker);
}

/* ФОРМА ДОБАВЛЕНИЯ */

// функция очистки значений popup
function cleanPopupValues() {
  popupName.value = null;
  popupUrl.value = null;
}

//функция обработки нажатия на кнопку добавить
function addButtonHandler() {
  cleanPopupValues();
  openPopupAddEl(popupAdd,popupClassMarker);
}

// функция подготовки к вставке нового элемента
function prepareNewElement() {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const deleteButton = element.querySelector(".element__delete-button");
  const elementLike = element.querySelector(".element__like")
  const elementTitle = element.querySelector('.element__title')
  elementImage.src = popupUrl.value
  elementTitle.textContent = popupName.value
  elementImage.alt = elementTitle.textContent; //alt будет содержать значение заголовка элемента (карточки)
  deleteButton.addEventListener('click', deleteElementButtonHandler);
  elementLike.addEventListener("click", likeButtonHandler);
  elementImage.addEventListener("click", elementImageHandler);
  return element;
}

// Добавление нового элемента без задействия массива изначальных элементов
function appendNewElement(newElement, targetElement) {
  targetElement.prepend(prepareNewElement(newElement));  // отображаем на странице
}
//функция обработчик формы добавления
function formAddHandler(evt) {
  evt.preventDefault();
  appendNewElement(prepareNewElement(), elements)
  closeAnyPopup(popupClassMarker);
}

/* УВЕЛИЧЕНИЕ */

//функции обработчики событий
function likeButtonHandler(evt) {
  evt.target.classList.toggle("element__like_active");
};

//функция открытия попапа при клике на изображение
function elementImageHandler(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  openPopupAddEl(popupEnlarge,popupClassMarker);
};

function deleteElementButtonHandler(evt) {
  const elementToDelete = evt.target.closest('.element');
  elementToDelete.remove();
  evt.target.removeEventListener("click", elementImageHandler);
  evt.target.removeEventListener("click", likeButtonHandler);
  evt.target.removeEventListener('click', deleteElementButtonHandler);
};

//ждуны слушатели
editButton.addEventListener("click", editButtonHandler);
allCloseButtons.forEach((item) => { item.addEventListener("click", closeButtonHandler) });
addButton.addEventListener("click", addButtonHandler);
popupAddForm.addEventListener("submit", formAddHandler);
popupEditForm.addEventListener("submit", formEditHandler);
allPopup.forEach((item) => item.addEventListener('mousedown', closePopupAtOverlayClick));
