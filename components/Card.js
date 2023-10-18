export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon;
      });
    // card__delete-button
    this._cardElement
      .querySelector(".card__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteCard;
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    this._cardElement
      .querySelector(".card__image")
      .classList.add("modal_opened");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    // get card view
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;

    const cardlocationElement =
      this._cardElement.querySelector(".card__location");
    cardlocationElement.textContent = this._name;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}

// function getCardElement(cardData) {
// const cardElement = cardTemplate.cloneNode(true);
// const cardImageElement = cardElement.querySelector(".card__image");
// const cardLocationElement = cardElement.querySelector(".card__location");
// const likeButton = cardElement.querySelector(".card__like-button");
// const deleteButton = cardElement.querySelector(".card__delete-icon");

// deleteButton.addEventListener("click", () => cardElement.remove());

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

//   cardImageElement.addEventListener("click", () => {
//     previewImage.src = cardData.link;
//     previewImage.alt = cardData.name;
//     previewText.textContent = cardData.name;
//     openModal(previewImageModal);
//   });

//   cardImageElement.src = cardData.link;
//   cardImageElement.alt = cardData.name;
//   cardLocationElement.textContent = cardData.name;
//   return cardElement;
// }
