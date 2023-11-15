/* -------------------------------------------------------------------------- */
/*                       special purpose options onjects                      */
/* -------------------------------------------------------------------------- */
export const apiOptions = {
  "baseUrl": 'https://around-api.en.tripleten-services.com/v1',
  "defaultHeaders": {
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

/* -------------------------------------------------------------------------- */
/*                              top level buttons                             */
/* -------------------------------------------------------------------------- */
export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector("#add-new-card-button");

/* -------------------------------------------------------------------------- */
/*                             general list items                             */
/* -------------------------------------------------------------------------- */
export const popupList = document.querySelectorAll(".popup");
export const cardList = document.querySelectorAll(".cards__list");
export const formList = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);

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

export const popupAddNewCardNameInput = document.querySelector("#title");
export const popupAddNewCardImageLinkInput = document.querySelector("#popup");
export const popupAddNewCardCloseButton = addNewCardPopup.querySelector(
  "#add-new-card-popup-close-button"
);
export const previewImagepopupCloseButton = previewImagePopup.querySelector(
  "#preview-image-popup-close-button"
);
