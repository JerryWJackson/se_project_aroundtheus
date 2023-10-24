import { closeByEscape } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    closeByEscape();
  }

  setEventListeners() {
    // sets event listeners
    this._closeButton = this._popupElement.querySelector('.popup__close');
    this._closeButton.addEventListener("click", this.close());
  }
}
