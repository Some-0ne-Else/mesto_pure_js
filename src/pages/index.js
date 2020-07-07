import './index.css';
/* Спасибо за ценные замечания. Многое прояснилось. */
import {
  editButton,
  addButton,
  editAvatar,
  profileFullName,
  profileVocation,
  profileAvatar,
  popupFullName,
  popupVocation,
  popupAvatar,
  targetContainer,
  cardTemplate,
  editFormValidaion,
  addFormValidation,
  avatarFormValidation,
  token,
  cohort,
  baseUrl,
  userInfoPostfix,
  cardsPostfix,
  idOnServer,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithModal from '../components/PopupWithModal.js';
import Api from '../components/Api.js';

/* creating instances of rendering logic */
const api = new Api(token, baseUrl, cohort);
const enlargePopupInstance = new PopupWithImage('.popup-enlarge');
const fetchedCards = api.fetchData(cardsPostfix);
const fetchedUserInfo = api.fetchData(userInfoPostfix);
const userData = new UserInfo({ fullName: profileFullName, vocation: profileVocation, avatar: profileAvatar });
const avatarPopupInstance = new PopupWithForm('.popup_avatar', () => {
  const actionButton = document.querySelector('.popup_avatar').querySelector('.popup__action-button');
  actionButton.textContent = "Сохранение..."
  api.updateAvatar(userInfoPostfix, popupAvatar.value)
    .then((data) => { profileAvatar.src = data.avatar; actionButton.textContent = "Сохранить"; })
});

/* set data from server to page */
fetchedUserInfo.then((result) => { userData.setUserInfo(result); });

/*make it in global scope, mb there is another better way */
let cardSection;
fetchedCards.then((result) => {
  cardSection = new Section({
    items: result.reverse(),
    renderer: (item) => {
      const card = new Card(item.name, item.link, item.likes, item._id, item.owner._id, idOnServer,
        enlargePopupInstance.open.bind(enlargePopupInstance),
        deletePopupInstance.open.bind(deletePopupInstance, item._id),
        (evt, cardId) => {
          const likeCouner = evt.target.parentNode.querySelector('.element__like-counter');
          const isLiked = card.isLiked();
          if (!card.isLiked()) { evt.target.classList.add('element__like_active'); likeCouner.textContent = String(parseInt(card._likesArray.length, 10) + 1); }
          else { evt.target.classList.remove('element__like_active'); likeCouner.textContent = String(parseInt(card._likesArray.length, 10) - 1); }
          api.likeCard(cardsPostfix, item._id, item.likes, idOnServer, isLiked).then((result) => card._likesArray = result.likes);
        },
        cardTemplate);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  }, targetContainer);
  cardSection.renderItems();
});

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit', (formData) => {
  userData.setUserInfo(formData);
  const actionButton = document.querySelector('.popup_edit').querySelector('.popup__action-button');
  actionButton.textContent = "Сохранение..."
  api.editProfile(userInfoPostfix, formData.name, formData.about).then(() => { actionButton.textContent = "Сохранить" });
});

const deletePopupInstance = new PopupWithModal('.popup_delete', (e, cardId) => {
  api.deleteCard(`${cardsPostfix}/${cardId}`);
  console.log("cardId", cardId); console.log("event", event);
  const elementToDelete = e.target.closest('.element');
  elementToDelete.remove();
});

const addPopupInstance = new PopupWithForm('.popup_add', (formData) => {
  const actionButton = document.querySelector('.popup_add').querySelector('.popup__action-button');
  actionButton.textContent = "Сохранение..."
  api.postCard(cardsPostfix, formData.name, formData.url)
    .then((result) => {
      actionButton.textContent = "Создать";
      const card = new Card(formData.name, formData.url, [], null, idOnServer, idOnServer,
        enlargePopupInstance.open.bind(enlargePopupInstance),
        deletePopupInstance.open.bind(deletePopupInstance, result._id),
        () => { api.likeCard(cardsPostfix, null, []); },
        cardTemplate);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    });
});

function editButtonHandler() {
  editFormValidaion.clearValidationErrors();
  popupFullName.value = userData.getUserInfo().name;
  popupVocation.value = userData.getUserInfo().about;
  editPopupInstance.open();
}

function addButtonHandler() {
  addFormValidation.clearValidationErrors();
  addPopupInstance.open();
}

function editAvatarHandler() {
  avatarFormValidation.clearValidationErrors();
  avatarPopupInstance.open();
}
/*adding event listeners  */
editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
editAvatar.addEventListener('click', editAvatarHandler);
editPopupInstance.setEventListeners();
addPopupInstance.setEventListeners();
avatarPopupInstance.setEventListeners();
deletePopupInstance.setEventListeners();
enlargePopupInstance.setEventListeners();
// enable validation
editFormValidaion.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();
