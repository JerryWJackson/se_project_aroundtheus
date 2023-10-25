import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupElement = document.querySelector(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItem) => {
      inputValues[inputItem.name] = inputItem.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  open() {
    // this only fires on the profile edit form to pull existing values
    if (this._popupForm.id == "profile-edit-popup-form") {
      const existingProfileValues = {
        name: document.querySelector(".profile__name").innerText,
        occupation: document.querySelector(".profile__description").innerText,
      };
      this._inputItems.forEach((inputItem) => {
        if (inputItem.id == "description") {
          inputItem.value = existingProfileValues.occupation;
        };
        if (inputItem.id == "name") {
          inputItem.value = existingProfileValues.name;
        };
      });
    }
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}