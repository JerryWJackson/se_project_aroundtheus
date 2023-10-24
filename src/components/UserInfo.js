export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._name = document.querySelector('#name').value;
    this._job = document.querySelector('#description').value;
  }

  getUserInfo() {
    console.log(this);
    const userData = { 
      name: this._name, 
      job: this._job,
    };
    return userData;
  }

  setuserInfo({ title, description }) {
    this._name.textContent = title;
    this._job.textContent = description;
  }
}
