export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._data = {
      location: this._name,
      src: this._link,
    };
  }

  _setEventListeners() {
    // card__like-button
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    // card__delete-button
    this._cardDeleteIcon.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteIcon =
      this._cardElement.querySelector(".card__delete-icon");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this.cardLocation = this._cardElement.querySelector(".card__location");
    // get card view
    this._cardImage.src = this._data.src;
    this._cardImage.alt = this._data.location;
    this.cardLocation.textContent = this._data.location;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
