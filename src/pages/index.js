import {
  validationSettings,
  profileEditPopupForm,
  popupProfileEditNameInput,
  popupProfileEditDescriptionInput,
  profileEditButton,
  addNewCardPopupForm,
  addNewCardButton,
  initialCards,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditPopupForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addNewCardPopupForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Popup                                        */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Edit Popup Form Profile---------------------- */

const profileEditPopup = new PopupWithForm(
  "#profile-edit-popup",
  handleEditProfileFormSubmit
);
profileEditPopup.setEventListeners();

/* --------------------------- Popup Preview Image -------------------------- */

const imagePopUp = new PopUpWithImage("#preview-image-popup");
imagePopUp.setEventListeners();

/* --------------------------- Popup Add Card -------------------------- */

const addCardPopUp = new PopupWithForm(
  "#add-new-card-popup",
  handleAddCardFormSubmit
);
addCardPopUp.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                   Section                                  */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      console.log(item);
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const userInfoNew = new UserInfo(".profile__name", ".profile__description");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
  console.log(data);
  imagePopUp.open(data);
}

function handleEditProfileFormSubmit(data) {
  userInfoNew.setUserInfo(data);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(data) {
  const cardValue = renderCard(data);
  cardSection.addItem(cardValue);
  addCardPopUp.close();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const profileData = userInfoNew.getUserInfo();
  profileEditPopup.setInputValues(profileData);
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopUp.open();
});
