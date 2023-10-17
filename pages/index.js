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
const addNewCardModal = document.querySelector("#add-new-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const cardListElement = document.querySelector(".cards__list");

const profileEditModalForm = profileEditModal.querySelector(
  "#profile-edit-modal-form"
);
const addNewCardModalForm = addNewCardModal.querySelector(".modal__form");

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
const modalAddNewCardNameInput = document.querySelector("#title");
const modalAddNewCardImageLinkInput = document.querySelector("#image-link");
const modalAddNewCardCloseButton = addNewCardModal.querySelector(
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
  document.removeEventListener('keydown', closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', closeByEscape);
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


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.modal_opened')
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
  renderCard({ name, link }, cardListElement);
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

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
