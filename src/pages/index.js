import './index.css';
/* Извините, был в командировке, поэтому такая большая задержка с внесением изменений. */
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
  editActionButton,
  avatarActionButton,
  addActionButton,
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
  showSavingState(avatarActionButton)
  api.updateAvatar(userInfoPostfix, popupAvatar.value)
    .then((data) => { profileAvatar.src = data.avatar; avatarActionButton.textContent = "Сохранить"; })
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
          const isLiked = card.isLiked();
          card.handleCounter(evt); /* Надеюсь, я правильно вас понял */
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
  showSavingState(editActionButton)
  api.editProfile(userInfoPostfix, formData.name, formData.about).then(() => { editActionButton.textContent = "Сохранить" });
});

const deletePopupInstance = new PopupWithModal('.popup_delete', (e, cardId) => {
  api.deleteCard(`${cardsPostfix}/${cardId}`).then(() => {
    const elementToDelete = e.target.closest('.element');
    elementToDelete.remove();
  })
});

const addPopupInstance = new PopupWithForm('.popup_add', (formData) => {
  showSavingState(addActionButton)
  api.postCard(cardsPostfix, formData.name, formData.url)
    .then((result) => {
      addActionButton.textContent = "Создать";
      console.log(result);
      const card = new Card(formData.name, formData.url, result.likes, result._id, result.owner._id, idOnServer,
        enlargePopupInstance.open.bind(enlargePopupInstance),
        deletePopupInstance.open.bind(deletePopupInstance, result._id),
        (evt) => {
          const isLiked = card.isLiked();
          card.handleCounter(evt);
          api.likeCard(cardsPostfix, result._id, result.likes, idOnServer, isLiked).then((result) => card._likesArray = result.likes);
        },
        cardTemplate);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    });
});

function editButtonHandler() {
  editFormValidaion.clearValidationErrors();
  const userInfo = userData.getUserInfo();
  popupFullName.value = userInfo.name;
  popupVocation.value = userInfo.about;
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
function showSavingState(actionButton) {
  actionButton.textContent = "Сохранение..."
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
