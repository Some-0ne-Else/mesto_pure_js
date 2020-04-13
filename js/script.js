const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__container");
const profileFullName = document.querySelector(".profile__full-name");
const profileVocation = document.querySelector(".profile__vocation");
const popupFullName = document.querySelector("#fullname");
const popupVocation = document.querySelector("#vocation");


console.log(profileFullName.value);
console.log(profileFullName.textContent);

function editButtonClick() {
  popupFullName.value = profileFullName.textContent;
  popupVocation.value = profileVocation.textContent;
  popup.classList.remove("popup_closed");
  popup.classList.add("popup_opened");
}

function closeButtonClick() {
  popup.classList.add("popup_closed");
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFullName.value;
  profileVocation.textContent = popupVocation.value;
  popup.classList.add("popup_closed");
  popup.classList.remove("popup_opened");
}


editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
formElement.addEventListener("submit", formSubmitHandler);


