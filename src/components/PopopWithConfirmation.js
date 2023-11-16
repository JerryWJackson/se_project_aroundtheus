import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  // this function accepts an function as an argument, and assigns it to this
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    // set event listener with this._handleSubmitCallback as it's handler
    // don't forget to call super.setEventListeners
  }
}
