export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._name = profileNameSelector;
    this._job = profileJobSelector;
  }

  getUserInfo() {
    const userData = { 
      name: this._name.textContent, 
      job: this._job.textContent,
    };
    return userData;
  }

  setuserInfo({ title, description }) {
    this._name.textContent = title;
    this._job.textContent = description;
  }
}
