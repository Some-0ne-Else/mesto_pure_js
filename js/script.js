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

//функция для создания обработчика события лайк. Др. функции аналогично.
function makeHandlerLikeButton() {
  let likeButton = document.querySelector(".element__like");
  likeButton.addEventListener("click", evt => evt.target.classList.toggle("element__like_active"));
}
function makeHandlerDeleteButton() {
  let deleteButton = document.querySelector(".element__delete-button");
  deleteButton.addEventListener('click', function () {
    const elementToDelete = deleteButton.closest('.element');
    elementToDelete.remove();
  });
}
function makeHandlerElementImage() {
  let elementImage = document.querySelector(".element__image");
  elementImage.addEventListener("click", evt => {
    popupEnlargedImage.src = elementImage.src;
    popupEnlargedCaption.textContent = elementImage.alt;
    popupEnlarged.classList.toggle("popup-enlarged_opened");
  });
}

// функция рендеринга одного элемента
function renderElement(item) {
  const elementTemplate = document.querySelector('.element__template').content;
  const elements = document.querySelector('.elements'); //цель для вставки
  let element = elementTemplate.cloneNode(true);
  // наполняем содержимым
  element.querySelector('.element__image').src = item.imageLink;
  element.querySelector('.element__title').textContent = item.title;
  element.querySelector('.element__image').alt = element.querySelector('.element__title').textContent; //alt будет содержать значение заголовка элемента (карточки)
  // отображаем на странице
  elements.prepend(element);
  //создаем обработчики
  makeHandlerLikeButton();
  makeHandlerDeleteButton();
  makeHandlerElementImage();
}

//Функция вывода изначальных 6 элементов из массива объектов
function renderInitialElements() {
  initialElements.forEach(item => renderElement(item));
}
renderInitialElements();

// функция очистки значений popup раз уж мы пошли путем эксплуатации одной html формы -)
function cleanPopupValues() {
  popupFirstInput.value = null;
  popupSecondInput.value = null;
}
//функция удаления обрабочиков, путь тернист и видимо ошибочен.
function removeEventListeners() {
  formElement.removeEventListener("submit", formEditHandler);
  formElement.removeEventListener("submit", formAddHandler);
}

//функция обработки нажатия на кнопку редактировать
function editButtonClick() {
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
function closeButtonClick() {
  popup.classList.remove("popup_opened");
  removeEventListeners();
}
//функция обработки нажатия на кнопку добавить
function addButtonClick() {
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
  removeEventListeners();
}
//функция обработчик формы добавления
function formAddHandler(evt) {
  evt.preventDefault();
  initialElements.push({ title: popupFirstInput.value, imageLink: popupSecondInput.value });
  renderElement(initialElements[initialElements.length - 1]);
  popup.classList.remove("popup_opened");
  removeEventListeners();
}
// обработка нажатия на кнопку закрыть для второй формы.
function popupEnlargedCloseButtonClick() {
  popupEnlarged.classList.remove("popup-enlarged_opened");
}

//ждуны слушатели
editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
addButton.addEventListener("click", addButtonClick);
popupEnlargedCloseButton.addEventListener("click", popupEnlargedCloseButtonClick);
