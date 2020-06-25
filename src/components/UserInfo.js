export default class UserInfo {
  constructor({ fullName, vocation }) {
    this._fullName = fullName;
    this._vocation = vocation;

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
