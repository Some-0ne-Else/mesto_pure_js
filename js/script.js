const initialElements = [
  {
    title: 'Карачаевск',
    imageLink: './images/element__image_karachaevsk.jpg'
  },
  {
    title: 'Гора Эльбрус',
    imageLink: './images/element__image_elbrus.jpg'
  },
  {
    title: 'Домбай',
    imageLink: './images/element__image_dombai.jpg'
  },
  {
    title: 'Колумбия',
    imageLink: './images/element__image_columbia.jpg'
  },
  {
    title: 'Будапешт',
    imageLink: './images/element__image_budapesht.jpg'
  },
  {
    title: 'Вьетнам',
    imageLink: './images/element__image_vietnam.jpg'
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
const popupFullName = document.querySelector("#fullname"); // нужно поменять названия переменных
const popupVocation = document.querySelector("#vocation"); // нужно поменять названия переменных
const popupEnlarged = document.querySelector(".popup-enlarged");
const popupEnlargedImage = document.querySelector(".popup-enlarged__image");

//функция для создания обработчика события лайк
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
  popupEnlarged.classList.toggle("popup-enlarged_opened");
  });


}

// функция рендера одного элемента
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
  makeHandlerLikeButton();
  makeHandlerDeleteButton();
  makeHandlerElementImage()
}

function renderInitialElements(){
initialElements.forEach(item => renderElement(item));
}
renderInitialElements();


function cleanPopupValues(){
  popupFullName.value = null;
  popupVocation.value = null;
}

function removeEventListeners(){
  formElement.removeEventListener("submit", formEditHandler);
  formElement.removeEventListener("submit", formAddHandler);
}

function editButtonClick() {
 // очищать не нужно т.к. данные попапа затираются данными со страницы
  popupHeading.textContent = "Редактировать профиль";
  popupFullName.placeholder = "Имя полностью";
  popupVocation.placeholder = "Призвание";
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  popupActionButton.textContent = "Сохранить"
  formElement.addEventListener("submit", formEditHandler);
  popup.classList.add("popup_opened");
}

function closeButtonClick() {
  popup.classList.remove("popup_opened");
  removeEventListeners();
}

function addButtonClick() {
  cleanPopupValues();
  popupHeading.textContent = "Новое место";
  popupFullName.placeholder = "Название";
  popupVocation.placeholder = "Ссылка на картинку";
  popupActionButton.textContent = "Создать";
  formElement.addEventListener("submit", formAddHandler);
  popup.classList.add("popup_opened");
}

function formEditHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  popup.classList.remove("popup_opened");
  removeEventListeners();
}

function formAddHandler(evt) {
  evt.preventDefault();
  initialElements.push({title:popupFullName.value, imageLink:popupVocation.value }) ; // нужно поменять названия переменных
  renderElement(initialElements[initialElements.length-1]);
  popup.classList.remove("popup_opened");
  removeEventListeners();
}

editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
addButton.addEventListener("click", addButtonClick);



// Сделать фикс для автозаполнения браузера например новый модификатор
