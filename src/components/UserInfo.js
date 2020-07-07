export default class UserInfo {
  constructor({ fullName, vocation, avatar }) {
    this._name = fullName;
    this._about = vocation;
    this._avatar = avatar;
  }

  getUserInfo() {
    return ({
      name: this._name.textContent,
      about: this._about.textContent,
    }
    );
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
    if (formData.avatar) { this._avatar.src = formData.avatar; }
  }
}
