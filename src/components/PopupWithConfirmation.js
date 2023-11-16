import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteConfirmSubmit) {
    super({ popupSelector });
    this._handleDeleteConfirmSubmit = handleDeleteConfirmSubmit;
  }

  // this function accepts an function as an argument, and assigns it to this
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    // set event listener with this._handleSubmitCallback as it's handler
    // don't forget to call super.setEventListeners
    this._popupElement.addEventListener("submit", (evt) => {
      console.log('submit button clicked');
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }
}
