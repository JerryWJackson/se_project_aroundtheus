import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteConfirmSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(
      "#confirm-image-delete-popup-form"
    );
    this._handleDeleteConfirmSubmit = handleDeleteConfirmSubmit;
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._submitButtonValue = this._submitButton.textContent;
  }

  // this function accepts an function as an argument, and assigns it to this
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    // set event listener with this._handleSubmitCallback as it's handler
    // don't forget to call super.setEventListeners
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }

  setLoading(isLoading, buttonValue) {
    this._submitButton.textContent = isLoading
      ? buttonValue
      : this._submitButtonValue;
  }
}
