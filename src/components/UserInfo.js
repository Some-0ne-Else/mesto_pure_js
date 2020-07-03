export default class UserInfo {
  constructor({ fullName, vocation, imgUrl }) {
    this._fullName = fullName;
    this._vocation = vocation;
    this._imgUrl = imgUrl;
  }

  createMarkup(){
    return
    `<img class="profile__avatar" src=${this._imgUrl} alt="Фото профиля">
    <div class="profile__profile-info">
      <h2 class="profile__full-name">${this._fullName}</h2>
      <button class="profile__edit-button"></button>
      <p class="profile__vocation">${this._vocation}</p>
    </div>`
  }

  getUserInfo() {
    return ({
      name: this._fullName.textContent,
      vocation: this._vocation.textContent
    }
    );
  }

  setUserInfo(userData) {
    this._fullName.textContent = userData.fullname;
    this._vocation.textContent = userData.vocation;
  }
}
