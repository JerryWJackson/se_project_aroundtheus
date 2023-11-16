export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatar) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
      link: this._avatar.src
    };
    // console.log(userData);
    return userData;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({ link }) {
    this._avatar.src = link
  }
}
