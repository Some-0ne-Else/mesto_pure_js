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
const popupFullName = document.querySelector("#fullname");
const popupVocation = document.querySelector("#vocation");

//initialElements.forEach(item => console.log(item.title))

// функция рендера одного элемента
function renderElement(item){
const elementTemplate = document.querySelector('.element__template').content;
const elements = document.querySelector('.elements'); //куда вставляем
let element = elementTemplate.cloneNode(true);
// наполняем содержимым
element.querySelector('.element__image').src = item.imageLink;
element.querySelector('.element__title').textContent = item.title;
element.querySelector('.element__image').alt = element.querySelector('.element__title').textContent; //alt будет содержать значение заголовка элемента (карточки)
// отображаем на странице
elements.append(element);
}

function renderInitialElements(){
initialElements.forEach(item => renderElement(item));
}
renderInitialElements();


function editButtonClick() {
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
}

function addButtonClick() {
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
}

function formAddHandler(evt) {
  evt.preventDefault();

  initialElements.push({title:popupFullName.value, imageLink:popupVocation.value }) ; // нужно поменять названия переменных
  console.log(initialElements[initialElements.length-1]);
  renderElement(initialElements[initialElements.length-1]);

  // теперь применим логику из InitElementsRender
  popup.classList.remove("popup_opened");
}



editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
addButton.addEventListener("click", addButtonClick);
