export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._occupation = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
    };
    return userData;
  }

  setUserInfo({ name, occupation }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
}
