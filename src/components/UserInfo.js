export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userData;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._job.textContent = description;
  }
}
