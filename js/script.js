const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__container")

function editButtonClick() {
  document.querySelector(".popup__full-name").value = document.querySelector(".profile__full-name").textContent;
  document.querySelector(".popup__vocation").value = document.querySelector(".profile__vocation").textContent;
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
}

function closeButtonClick() {
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    document.querySelector(".profile__full-name").textContent = document.querySelector(".popup__full-name").value;
    document.querySelector(".profile__vocation").textContent =  document.querySelector(".popup__vocation").value;
}
editButton.addEventListener("click", editButtonClick);
closeButton.addEventListener("click", closeButtonClick);
formElement.addEventListener('submit', formSubmitHandler);

/*В принципе, можно всю разметку формы вставлять в html в момент вызова формы, но нужно ли? */
