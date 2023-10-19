import {
  profileEditpopup,
  profileEditpopupForm,
  addNewCardpopup,
  addNewCardpopupForm,
  validationSettings,
  cardListElement,
  previewImage,
  previewText,
  popupProfileEditNameInput,
  popupProfileEditDescriptionInput,
  profileName,
  profileDescription,
  popupAddNewCardNameInput,
  popupAddNewCardImageLinkInput,
  popupList,
  profileEditButton,
  addNewCardButton,
  initialCards,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(
  validationSettings,
  addNewCardpopupForm
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditpopupForm
);
editFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closepopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openpopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  cardListElement.prepend(card.getView());
}

function handleImageClick(name, link) {
  console.log("clicked on image to preview!");
  previewImage.src = link;
  previewImage.alt = name;
  previewText.textContent = name;
  openpopup(previewImagepopup);
}

function fillProfileForm() {
  popupProfileEditNameInput.value = profileName.textContent;
  popupProfileEditDescriptionInput.value = profileDescription.textContent;
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closepopup(openedPopup);
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileEditNameInput.value;
  profileDescription.textContent = popupProfileEditDescriptionInput.value;
  closepopup(profileEditpopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = popupAddNewCardNameInput.value;
  const link = popupAddNewCardImageLinkInput.value;
  renderCard({ name, link });
  evt.target.reset();
  closepopup(addNewCardpopup);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closepopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closepopup(popup);
    }
  });
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openpopup(profileEditpopup);
  editFormValidator.resetValidation();
});

profileEditpopupForm.addEventListener("submit", handleProfileFormSubmit);

addNewCardButton.addEventListener("click", () => {
  openpopup(addNewCardpopup);
  addFormValidator.resetValidation();
});

addNewCardpopup.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach(renderCard);
