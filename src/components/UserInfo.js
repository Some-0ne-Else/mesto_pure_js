export default class UserInfo {
  constructor({ fullname, vocation }) {
    this._fullname = fullname;
    this._vocation = vocation;

  }

  getUserInfo() {
    return (this._userData = {
      name: this._fullname.textContent,
      vocation: this._vocation.textContent
    }
    );
  }

  setUserInfo(UserData) {
    this._fullname.textContent = UserData.fullname;
    this._vocation.textContent = UserData.vocation;
  }
}
