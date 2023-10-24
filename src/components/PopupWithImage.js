import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector("#preview-image");
    this._previewText = this._popupElement.querySelector(
      ".popup__preview-text"
    );
  }

  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._previewText.textContent = data.name;
    super.open();
  }
}
