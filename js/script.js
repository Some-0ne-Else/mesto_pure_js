const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__container");
const profileFullName = document.querySelector(".profile__full-name");
const profileVocation = document.querySelector(".profile__vocation");
const popupFullName = document.querySelector("#fullname");
const popupVocation = document.querySelector("#vocation");

function editButtonClick() {
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  popup.classList.add("popup_opened");
}

function closeButtonClick() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
