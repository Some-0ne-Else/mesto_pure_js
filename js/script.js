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

/* Пришлось отказаться от переиспользования одного и того же шаблона popup (был единый для форм редактирования и добавления т.к. идентичны по компоновке на 100%) ввиду задания 6 работы
 прямо указывающего на использование стандартных сообщений об ошибках при валидации форм. */


const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const elements = document.querySelector('.elements'); //цель для вставки новых элементов на страницу

const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupEditProfileCloseButton = document.querySelector(".popup-edit-profile__close-button");
const popupEditProfileActionButton = document.querySelector(".popup-edit-profile__action-button");
const popupEditProfileFormElement = document.querySelector(".popup-edit-profile__container");
const popupEditProfileHeading = document.querySelector(".popup-edit-profile__heading");
const profileFullName = document.querySelector(".profile__full-name");
const profileVocation = document.querySelector(".profile__vocation");
const popupEditProfileFullName = document.querySelector("#full-name");
const popupEditProfileVocation = document.querySelector("#vocation");

const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const popupActionButton = document.querySelector(".popup__action-button");
const formElement = document.querySelector(".popup__container");
const popupHeading = document.querySelector(".popup__heading");
const popupName = document.querySelector("#name");
const popupUrl = document.querySelector("#url");

const popupEnlarged = document.querySelector(".popup-enlarged");
const popupEnlargedImage = document.querySelector(".popup-enlarged__image");
const popupEnlargedCloseButton = document.querySelector(".popup-enlarged__close-button");
const popupEnlargedCaption = document.querySelector(".popup-enlarged__caption");

//функции обработчиков событий лайк. Др. функции аналогично.

function likeButtonHandler(evt) {
  evt.target.classList.toggle("element__like_active");
};

function deleteElementButtonHandler(evt) {
  const elementToDelete = evt.target.closest('.element');
  elementToDelete.remove();
  evt.target.removeEventListener("click", elementImageHandler);
  evt.target.removeEventListener("click", likeButtonHandler);
  evt.target.removeEventListener('click', deleteElementButtonHandler);
};

function elementImageHandler(evt) {
  popupEnlargedImage.src = evt.target.src;
  popupEnlargedCaption.textContent = evt.target.alt;
  document.addEventListener('keyup', closeAnyPopupAtEscape);
  popupEnlarged.classList.toggle("popup-enlarged_opened");
};

function makeListenerElementImage() {
  let elementImage = document.querySelector(".element__image");
  elementImage.addEventListener("click", elementImageHandler);
};

function makeListenerLikeButton(evt) {
  let likeButton = document.querySelector(".element__like");
  likeButton.addEventListener("click", likeButtonHandler);
};

function makeListenerDeleteButton() {
  let deleteButton = document.querySelector(".element__delete-button");
  deleteButton.addEventListener('click', deleteElementButtonHandler);
};


//функция закрытия любого попапа по Esc
function closeAnyPopupAtEscape(evt){
  if(evt.key === 'Escape'){
  popupEnlargedCloseButtonHandler();
  closeButtonHandler();
  popupEditProfileCloseButtonHandler();
}
};

// функция рендеринга одного элемента
function renderElement(item) {
  const elementTemplate = document.querySelector('.element__template').content;
  let element = elementTemplate.cloneNode(true);
  // наполняем содержимым
  element.querySelector('.element__image').src = item.imageLink;
  element.querySelector('.element__title').textContent = item.title;
  element.querySelector('.element__image').alt = element.querySelector('.element__title').textContent; //alt будет содержать значение заголовка элемента (карточки)
  return element;
}
//функция добавления элемента на страницу принимает пар1 элемент пар2 куда вставляем
function appendElement(element, targetElement) {
  targetElement.prepend(renderElement(element));  // отображаем на странице
  //создаем ждунов-слушателей
  makeListenerLikeButton(document.querySelector(".element__like"));
  makeListenerDeleteButton();
  makeListenerElementImage();
}

//функция добавления изначальных элементов на страницу принимает пар1 элемент пар2 куда вставляем
function appendInitialElements() {
  initialElements.forEach(element => appendElement(element, elements));
}

// Вызов функции добавления изначальных элементов
appendInitialElements();

// функция очистки значений popup раз уж мы пошли путем эксплуатации одной html формы -)
function cleanPopupValues() {
  popupName.value = null;
  popupUrl.value = null;
}
//функция удаления обработчиков
function removeFormEventListeners() {
  formElement.removeEventListener("submit", formEditHandler);
  formElement.removeEventListener("submit", formAddHandler);
  document.addEventListener('click',closeAnyPopupAtEscape);
}

//функция обработки нажатия на кнопку редактировать
function editButtonHandler() {
  popupEditProfileFullName.value = profileFullName.textContent;
  popupEditProfileVocation.value = profileVocation.textContent;
  const popupEditProfileInactiveButtonClass = 'popup-edit-profile__action-button_disabled';
  const popupEditProfileAnyInput = ".popup-edit-profile__input";
  const popupEditProfileActionButtonClass= ".popup-edit-profile__action-button";
  refreshButtonState(popupEditProfileFormElement, popupEditProfileAnyInput,popupEditProfileActionButtonClass, popupEditProfileInactiveButtonClass); //обновим состояние кнопки
  popupEditProfileFormElement.addEventListener("submit", formEditHandler);
  //document.addEventListener('keyup', (evt => { if(evt.key === 'Escape'){popupEditProfileCloseButtonHandler()} }));
  document.addEventListener('keyup', closeAnyPopupAtEscape);
  popupEditProfile.classList.add("popup-edit-profile_opened");
}


//функция обработки нажатия на кнопку закрыть
function closeButtonHandler() {
  popup.classList.remove("popup_opened");
  removeFormEventListeners();
}

function popupEditProfileCloseButtonHandler(evt,somevar) {
  popupEditProfile.classList.remove("popup-edit-profile_opened");
  removeFormEventListeners();
}

//функция обработки нажатия на кнопку добавить
function addButtonHandler() {
  cleanPopupValues();
  popupHeading.textContent = "Новое место";
  popupName.placeholder = "Название";
  popupUrl.placeholder = "Ссылка на картинку";
  popupActionButton.textContent = "Создать";
  formElement.addEventListener("submit", formAddHandler);
  document.addEventListener('keyup', closeAnyPopupAtEscape);
  popup.classList.add("popup_opened");
}
//функция обработчик формы редактирования
function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupEditProfileFullName.value;
  profileVocation.textContent = popupEditProfileVocation.value;
  popupEditProfile.classList.remove("popup-edit-profile_opened");
  removeFormEventListeners();
}
//функция обработчик формы добавления
function formAddHandler(evt) {
  evt.preventDefault();
  initialElements.push({ title: popupName.value, imageLink: popupUrl.value });
  appendElement(initialElements[initialElements.length - 1], elements);
  popup.classList.remove("popup_opened");
  removeFormEventListeners();
}
// обработка нажатия на кнопку закрыть для второй формы.
function popupEnlargedCloseButtonHandler() {
  popupEnlarged.classList.remove("popup-enlarged_opened");
}


//ждуны слушатели
editButton.addEventListener("click", editButtonHandler);
popupEditProfileCloseButton.addEventListener('click',popupEditProfileCloseButtonHandler);
closeButton.addEventListener("click", closeButtonHandler);
addButton.addEventListener("click", addButtonHandler);
popupEnlargedCloseButton.addEventListener("click", popupEnlargedCloseButtonHandler);



popupEditProfile.addEventListener('click',popupEditProfileCloseButtonHandler);
