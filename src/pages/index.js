import './index.css';

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
  editForm,
  addForm,
  editAvatarForm,
  token,
  userInfoUrl,
  cardsUrl,
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
const api = new Api(token);
const enlargePopupInstance = new PopupWithImage('.popup-enlarge');
const fetchedCards = api.fetchData(cardsUrl);
const fetchedUserInfo = api.fetchData(userInfoUrl);
const userData = new UserInfo({ fullName: profileFullName, vocation: profileVocation, avatar: profileAvatar });
const avatarPopupInstance = new PopupWithForm('.popup_avatar', () => { const result = api.updateAvatar(userInfoUrl, popupAvatar.value); result.then((data) => profileAvatar.src = data.avatar) });

/* set data from server to page */
fetchedUserInfo.then((result) => { userData.setUserInfo(result); });

const cardSection = new Section({
  items: fetchedCards.then((result) => result.forEach((item) => {
    const card = new Card(item.name, item.link, item.likes, item._id, item.owner._id, idOnServer,
      enlargePopupInstance.open.bind(enlargePopupInstance),
      deletePopupInstance.open.bind(deletePopupInstance, item._id),
      (evt, cardId) => {
        const likeCouner = evt.target.parentNode.querySelector('.element__like-counter');
        if (!card._isLiked()) { evt.target.classList.add('element__like_active'); likeCouner.textContent = parseInt(item.likes.length, 10) + 1; }
        else { evt.target.classList.remove('element__like_active'); likeCouner.textContent = parseInt(item.likes.length, 10) - 1; }
        console.log('likeCounter', likeCouner)
        api.likeCard(cardsUrl, item._id, item.likes, idOnServer);
      },
      cardTemplate);
    const cardElement = card.generateCard();
    cardSection.addInitialItem(cardElement);
  })),
}, targetContainer);

/* making instances of popup clases */
const editPopupInstance = new PopupWithForm('.popup_edit', (formData) => {
  userData.setUserInfo(formData);
  const actionButton = document.querySelector('.popup_edit').querySelector('.popup__action-button');
  actionButton.textContent = "Сохранение..."
  api.editProfile(userInfoUrl, formData.name, formData.about).then(() => { actionButton.textContent = "Сохранить" });
});

const deletePopupInstance = new PopupWithModal('.popup_delete', (e, cardId) => {
  api.deleteCard(`${cardsUrl}/${cardId}`);
  const elementToDelete = e.target.closest('.element');
  elementToDelete.remove();
});

const addPopupInstance = new PopupWithForm('.popup_add', (formData) => {
  const card = new Card(formData.name, formData.url, [], null, idOnServer, idOnServer,
    enlargePopupInstance.open.bind(enlargePopupInstance),
    deletePopupInstance.open.bind(deletePopupInstance),
    api.likeCard(cardsUrl, null, null),
    cardTemplate);
  const cardElement = card.generateCard();
  api.postCard(cardsUrl, formData.name, formData.url);
  cardSection.addItem(cardElement);
});

function editButtonHandler() {
  editForm.clearValidationErrors();
  popupFullName.value = userData.getUserInfo().name;
  popupVocation.value = userData.getUserInfo().about;
  editPopupInstance.open();
}

function addButtonHandler() {
  addForm.clearValidationErrors();
  addPopupInstance.open();
}

function editAvatarHandler() {
  editAvatarForm.clearValidationErrors();
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
editForm.enableValidation();
addForm.enableValidation();
editAvatarForm.enableValidation();
