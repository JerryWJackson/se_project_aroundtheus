import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Wrappers
const modalList = document.querySelectorAll(".modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalForm = profileEditModal.querySelector(
  "#profile-edit-modal-form"
);
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addNewCardModalForm = addNewCardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#preview-image-modal");

const cardListElement = document.querySelector(".cards__list");

const previewImage = previewImageModal.querySelector("#preview-image");
const previewText = previewImageModal.querySelector(".modal__preview-text");

// Templates
const cardSelector = "#card-template";
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// DOM Node Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const modalProfileEditNameInput = document.querySelector("#name");
const modalProfileEditDescriptionInput = document.querySelector("#description");
const modalProfileEditCloseButton = profileEditModal.querySelector(
  "#edit-modal-close-button"
);
const addNewCardButton = document.querySelector("#add-new-card-button");
const modalAddNewCardNameInput = document.querySelector("#title");
const modalAddNewCardImageLinkInput = document.querySelector("#image-link");
const modalAddNewCardCloseButton = addNewCardModal.querySelector(
  "#add-new-card-modal-close-button"
);
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(
  validationSettings,
  addNewCardModalForm
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModalForm
);
editFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  const cardEl = card.getView();
  // console.log(cardEl.querySelector(".card__image"));
  cardListElement.prepend(card.getView());
}

function handleImageClick(name, link) {
  console.log("clicked on image to preview!");
  previewImage.src = link;
  previewImage.alt = name;
  previewText.textContent = name;
  openModal(previewImageModal);
}

function fillProfileForm() {
  modalProfileEditNameInput.value = profileName.textContent;
  modalProfileEditDescriptionInput.value = profileDescription.textContent;
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileEditNameInput.value;
  profileDescription.textContent = modalProfileEditDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = modalAddNewCardNameInput.value;
  const link = modalAddNewCardImageLinkInput.value;
  renderCard({ name, link });
  evt.target.reset();
  closeModal(addNewCardModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

modalProfileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditModalForm.addEventListener("submit", handleProfileFormSubmit);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

modalAddNewCardCloseButton.addEventListener("click", () =>
  closeModal(addNewCardModal)
);
addNewCardModal.addEventListener("submit", handleAddCardFormSubmit);

previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

modalList.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
initialCards.forEach((cardData) => renderCard(cardData));
