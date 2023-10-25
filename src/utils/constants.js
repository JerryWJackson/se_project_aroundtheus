export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
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
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const popupProfileEditNameInput = document.querySelector("#name");
export const popupProfileEditDescriptionInput =
  document.querySelector("#description");
export const popupProfileEditCloseButton = profileEditPopup.querySelector(
  "#edit-popup-close-button"
);
export const addNewCardButton = document.querySelector("#add-new-card-button");
export const popupAddNewCardNameInput = document.querySelector("#title");
export const popupAddNewCardImageLinkInput =
  document.querySelector("#image-link");
export const popupAddNewCardCloseButton = addNewCardPopup.querySelector(
  "#add-new-card-popup-close-button"
);
export const previewImagepopupCloseButton = previewImagePopup.querySelector(
  "#preview-image-popup-close-button"
);

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

