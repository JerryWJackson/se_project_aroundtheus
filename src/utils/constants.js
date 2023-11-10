export const initialCards = [
  {
    location: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    location: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    location: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    location: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    location: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    location: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const popupList = document.querySelectorAll(".popup");
export const profileEditPopup = document.querySelector("#profile-edit-popup");
export const profileEditPopupForm = profileEditPopup.querySelector(
  "#profile-edit-popup-form"
);
export const addNewCardPopup = document.querySelector("#add-new-card-popup");
export const addNewCardPopupForm =
  addNewCardPopup.querySelector(".popup__form");

export const previewImagePopup = document.querySelector("#preview-image-popup");

export const cardListElement = document.querySelector(".cards__list");

export const previewImage = previewImagePopup.querySelector("#preview-image");
export const previewText = previewImagePopup.querySelector(
  ".popup__preview-text"
);

// Templates
export const cardSelector = "#card-template";
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// DOM Node Elements
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileName = ".profile__name";
export const profileDescription = ".profile__description";
export const profileAvatar = ".profile__avatar-image";
export const avatarImage = document.querySelector('.profile__avatar-image')
export const popupProfileEditNameInput = document.querySelector("#name");
export const popupProfileEditDescriptionInput =
  document.querySelector("#description");
export const popupProfileEditCloseButton = profileEditPopup.querySelector(
  "#edit-popup-close-button"
);
export const addNewCardButton = document.querySelector("#add-new-card-button");
export const popupAddNewCardNameInput = document.querySelector("#title");
export const popupAddNewCardImageLinkInput = document.querySelector("#popup");
export const popupAddNewCardCloseButton = addNewCardPopup.querySelector(
  "#add-new-card-popup-close-button"
);
export const previewImagepopupCloseButton = previewImagePopup.querySelector(
  "#preview-image-popup-close-button"
);

export const apiOptions = {
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  defaultHeaders: {
    "authorization": "ef1674b3-2f84-46ba-ade1-b5216183ce24",
    "Content-Type": "application/json",
  }
}

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
