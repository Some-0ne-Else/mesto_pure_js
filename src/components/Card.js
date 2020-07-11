import PopupWithImage from '../components/PopupWithImage.js'
export default class Card {
  constructor(title, url, likesArray, cardId , ownerId, idOnServer, handleCardClick, handleDeleteClick, handleLikeClick, templateSelector) {
    this._title = title;
    this._url = url;
    this._likesArray = likesArray;
    this._likeCounter = likesArray.length;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._idOnServer = idOnServer;
    this.handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');
    const elementLikeCounter = this._element.querySelector('.element__like-counter');
    elementImage.src = this._url;
    elementTitle.textContent = this._title;
    elementLikeCounter.textContent = this._likeCounter;
    elementImage.alt = this._title;

    /*selectors for listeners */
    const deleteButton = this._element.querySelector('.element__delete-button');
    const elementLike = this._element.querySelector('.element__like');
    /* adding handlers */
    if(this._isOwner()) {deleteButton.addEventListener('click', (evt) =>  {this._handleDeleteClick(evt, this._cardId);});} else {deleteButton.remove();}
    if(this.isLiked()) {elementLike.classList.add('element__like_active')}
    elementLike.addEventListener('click', (evt) => {this._handleLikeClick(evt, this._cardId)});
    elementImage.addEventListener('click', () => { this.handleCardClick(this._title, this._url)});

    // return element outside
    return this._element;
  }

  _isOwner(){
    if(this._ownerId===this._idOnServer) {return true} else {return false}
  }
  isLiked(){
    const hasLike = (element) => element._id===this._idOnServer;
    return this._likesArray.some(hasLike);
  }
 handleCounter(evt){
  const likeCounter = evt.target.parentNode.querySelector('.element__like-counter');
  if (!this.isLiked()) { evt.target.classList.add('element__like_active'); likeCounter.textContent = String(parseInt(this._likesArray.length, 10) + 1); }
  else { evt.target.classList.remove('element__like_active'); likeCounter.textContent = String(parseInt(this._likesArray.length, 10) - 1); }
 }
}
