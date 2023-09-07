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
const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalForm = profileEditModal.querySelector(
  "#profile-edit-modal-form"
);
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addNewCardModalForm = addNewCardModal.querySelector(
  "#add-new-card-modal-form"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector("#preview-image");
const previewText = previewImageModal.querySelector(".modal__preview-text");

// Templates
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
const modaladdNewCardNameInput = document.querySelector("#title");
const modaladdNewCardImageLinkInput = document.querySelector("#image-link");
const modaladdNewCardCloseButton = addNewCardModal.querySelector(
  "#add-new-card-modal-close-button"
);
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLocationElement = cardElement.querySelector(".card__location");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-icon");

  deleteButton.addEventListener("click", () => cardElement.remove());

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewText.textContent = cardData.name;
    openModal(previewImageModal);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardLocationElement.textContent = cardData.name;
  return cardElement;
}

function fillProfileForm() {
  modalProfileEditNameInput.value = profileName.textContent;
  modalProfileEditDescriptionInput.value = profileDescription.textContent;
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileEditNameInput.value;
  profileDescription.textContent = modalProfileEditDescriptionInput.value;
  profileEditModalForm.reset();
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = modaladdNewCardNameInput.value;
  const link = modaladdNewCardImageLinkInput.value;
  renderCard({ name, link }, cardListElement);
  addNewCardModalForm.reset();
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

modaladdNewCardCloseButton.addEventListener("click", () =>
  closeModal(addNewCardModal)
);
addNewCardModal.addEventListener("submit", handleAddCardFormSubmit);

previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
