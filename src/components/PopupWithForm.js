import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;

    this._inputItems = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._submitButtonValue = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItem) => {
      inputValues[inputItem.name] = inputItem.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputItems.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setLoading(buttonValue) {
      this._submitButton.textContent = buttonValue;
  }

}
