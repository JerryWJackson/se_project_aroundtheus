export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatar) {
    this._name = document.querySelector(profileNameSelector);
    this._occupation = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src
    };
    // console.log(userData);
    return userData;
  }

  setUserInfo({ name, occupation }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }

  setUserAvatar(link) {
    this._avatar.src = link
  }
}
