export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteConfirmSubmit,
    handleCardLike
  ) {
    this._name = name;
    this._link = link;
    this.cardId = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteConfirmSubmit = handleDeleteConfirmSubmit;
    this._handleCardLike = handleCardLike;
    this._confirmDeleteImagePopup = document.querySelector(
      "#confirm-image-delete-popup"
    );
    this._data = {
      location: this._name,
      link: this._link,
    };
  }

  _setEventListeners() {
    // card__like-button
    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });
    // card__delete-button
    this._cardDeleteIcon.addEventListener("click", () => {
      this._handleDeleteConfirmSubmit(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  handleDeleteCard() {
    // let cardId = this._confirmDelete();
    this._cardElement.remove();
    this._cardElement = null;
    // console.log('(before return) cardId is', cardId);
    // return cardId;
  }

  updateLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this.id;
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.cardLocation.textContent = this._name;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
