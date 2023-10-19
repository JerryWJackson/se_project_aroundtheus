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
  export const profileEditpopup = document.querySelector("#profile-edit-popup");
  export const profileEditpopupForm = profileEditpopup.querySelector(
    "#profile-edit-popup-form"
  );
  export const addNewCardpopup = document.querySelector("#add-new-card-popup");
  export const addNewCardpopupForm = addNewCardpopup.querySelector(".popup__form");
  
  export const previewImagepopup = document.querySelector("#preview-image-popup");
  
  export const cardListElement = document.querySelector(".cards__list");
  
  export const previewImage = previewImagepopup.querySelector("#preview-image");
  export const previewText = previewImagepopup.querySelector(".popup__preview-text");
  
  // Templates
  export const cardSelector = "#card-template";
  export const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;

    // DOM Node Elements
  export const profileEditButton = document.querySelector("#profile-edit-button");
  export const profileName = document.querySelector(".profile__name");
  export const profileDescription = document.querySelector(".profile__description");
  export const popupProfileEditNameInput = document.querySelector("#name");
  export const popupProfileEditDescriptionInput = document.querySelector("#description");
  export const popupProfileEditCloseButton = profileEditpopup.querySelector(
    "#edit-popup-close-button"
  );
  export const addNewCardButton = document.querySelector("#add-new-card-button");
  export const popupAddNewCardNameInput = document.querySelector("#title");
  export const popupAddNewCardImageLinkInput = document.querySelector("#image-link");
  export const popupAddNewCardCloseButton = addNewCardpopup.querySelector(
    "#add-new-card-popup-close-button"
  );
  export const previewImagepopupCloseButton = previewImagepopup.querySelector(
    "#preview-image-popup-close-button"
  );
  
  export const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };