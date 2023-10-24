import {
  validationSettings,
  profileEditPopupForm,
  profileName,
  profileDescription,
  profileEditButton,
  addNewCardPopupForm,
  addNewCardButton,
  initialCards,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css"

/* -------------------------------------------------------------------------- */
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditPopupForm
);
const addFormValidator = new FormValidator(validationSettings, addNewCardPopupForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Popup                                        */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Edit Popup Form Profile---------------------- */

const userInfoNew = new UserInfo(".profile__title", ".profile__description");
const profileEditPopup = new PopupWithForm("#edit-popup", (data) => {
  userInfoNew.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

/* --------------------------- Popup Preview Image -------------------------- */

const imagePopUp = new PopUpWithImage("#image-preview-popup", handleImageClick);
imagePopUp.setEventListeners();

/* --------------------------- Popup Add Card -------------------------- */

const addCardPopUp = new PopupWithForm("#add-card-popup", handleFormSubmit);
addCardPopUp.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                   Section                                  */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
    },
  },
  "#cards__list"
);
cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
  imagePopUp.open(data);
}

function handleFormSubmit(data) {
  const cardValue = renderCard(data);
  cardSection.addItem();
  profileEditPopup.close();
  addCardPopUp.close();
  return cardValue;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const profileData = userInfoNew.getUserInfo();
  profileName.value = profileData.name;
  profileDescription.value = profileData.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopUp.open();
});
