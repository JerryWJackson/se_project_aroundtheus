import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleImageClick) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector("#preview-image");
    this._previewText = this._popupElement.querySelector(
      ".popup__preview-text"
    );
    this._handleImageClick = handleImageClick;
  }

  open(data) {
    console.log(data)
    this._previewImage.src = data.src;
    this._previewImage.alt = data.location;
    this._previewText.textContent = data.location;
    super.open();
  }
}
