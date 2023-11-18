export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatar) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    // console.log(userData);
    return userData;
  }

  getAvatar() {
    const avatarData = {
      avatar: this._avatar.src,
    };
    return avatarData;
  }

  setUserInfo(name, about) {
    console.log(this.__name);
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
