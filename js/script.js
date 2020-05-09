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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const elements = document.querySelector('.elements'); //цель для вставки
const closeButton = document.querySelector(".popup__close-button");
const popupActionButton = document.querySelector(".popup__action-button");
const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container");
const popupHeading = document.querySelector(".popup__heading");
const profileFullName = document.querySelector(".profile__full-name");
const profileVocation = document.querySelector(".profile__vocation");
const popupFirstInput = document.querySelector("#first-input");
const popupSecondInput = document.querySelector("#second-input");
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

function appendElement(element, targetElement) {
  // отображаем на странице
  //const elements = document.querySelector('.elements'); //цель для вставки
  targetElement.prepend(renderElement(element));
  //создаем ждунов слушателей
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
  popupFirstInput.value = null;
  popupSecondInput.value = null;
}
//функция удаления обрабочиков, путь тернист и видимо ошибочен.
function removeFormEventListeners() {
  formElement.removeEventListener("submit", formEditHandler);
  formElement.removeEventListener("submit", formAddHandler);
}

//функция обработки нажатия на кнопку редактировать
function editButtonHandler() {
  // очищать не нужно т.к. данные попапа затираются данными со страницы
  popupHeading.textContent = "Редактировать профиль";
  popupFirstInput.placeholder = "Имя полностью";
  popupSecondInput.placeholder = "Призвание";
  popupFirstInput.value = profileFullName.textContent;
  popupSecondInput.value = profileVocation.textContent;
  popupActionButton.textContent = "Сохранить"
  formElement.addEventListener("submit", formEditHandler);
  popup.classList.add("popup_opened");
}

//функция обработки нажатия на кнопку закрыть
function closeButtonHandler() {
  popup.classList.remove("popup_opened");
  removeFormEventListeners();
}
//функция обработки нажатия на кнопку добавить
function addButtonHandler() {
  cleanPopupValues();
  popupHeading.textContent = "Новое место";
  popupFirstInput.placeholder = "Название";
  popupSecondInput.placeholder = "Ссылка на картинку";
  popupActionButton.textContent = "Создать";
  formElement.addEventListener("submit", formAddHandler);
  popup.classList.add("popup_opened");
}
//функция обработчик формы редактирования
function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFirstInput.value;
  profileVocation.textContent = popupSecondInput.value;
  popup.classList.remove("popup_opened");
  removeFormEventListeners();
}
//функция обработчик формы добавления
function formAddHandler(evt) {
  evt.preventDefault();
  initialElements.push({ title: popupFirstInput.value, imageLink: popupSecondInput.value });
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
closeButton.addEventListener("click", closeButtonHandler);
addButton.addEventListener("click", addButtonHandler);
popupEnlargedCloseButton.addEventListener("click", popupEnlargedCloseButtonHandler);

//testzone
// Закрытие всплывающих окон по Esc вешать при открытии попапа и снимать при закрытии
document.addEventListener("keyup", evt => { if(evt.keyCode === 27){console.log(evt.key);popupEnlargedCloseButtonHandler();closeButtonHandler();}});
popup.addEventListener("click", evt => {popupEnlargedCloseButtonHandler();closeButtonHandler();} );
// popup.addEventListener('keyup', function (evt) {
//   if (evt.keyCode === 27){
//     closeButtonHandler();
//   }
// });
