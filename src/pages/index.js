import {
  apiOptions,
  validationSettings,
  formList,
  profileName,
  profileDescription,
  profileAvatar,
  profileEditButton,
  addNewCardButton,
  avatarImage,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import Api from "../components/API.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

const formValidators = {};

// enable validation
const enableValidation = (validationSettings) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.id;
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

/* -------------------------------------------------------------------------- */
/*                              Create API Client                             */
/* -------------------------------------------------------------------------- */

const api = new Api(apiOptions);

/* -------------------------------------------------------------------------- */
/*                                   Section                                  */
/* -------------------------------------------------------------------------- */

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardEl = renderCard(cardData);
          cardSection.addItem(cardEl);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });

// api.getInitialCards().then((res) => console.log('initialCards returned', res));

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

/* ---------------------------Popup Confirm Delete--------------------------- */

const confirmDeletePopup = new PopupWithForm(
  "#confirm-image-delete-popup",
  handleConfirmDeleteFormSubmit
);
confirmDeletePopup.setEventListeners();

/* ------------------------Change Profile Avatar Popup----------------------- */

const changeProfileAvatarPopUp = new PopupWithForm(
  "#change-profile-avatar-popup",
  handleAddCardFormSubmit
);
changeProfileAvatarPopUp.setEventListeners();

const userInfoNew = new UserInfo(
  profileName,
  profileDescription,
  profileAvatar
);

api.fetchUserInfo().then((data) => {
  userInfoNew.setUserInfo(data);
});

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
  api.editUserInfo(data);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(data) {
  const cardValue = renderCard(data);
  cardSection.addItem(cardValue);
  api.addCard(data).then((resData) => {
    console.log(resData._id);
    // let thisCardId = resData._id;
  });
  addCardPopUp.close();
}

function handleConfirmDeleteFormSubmit(cardId) {
  console.log("(after return) cardId is", cardId);

  api.deleteCard(cardId);
  confirmDeletePopup.close();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const profileData = userInfoNew.getUserInfo();
  profileEditPopup.setInputValues(profileData);
  formValidators["profile-edit-popup-form"].resetValidation();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  formValidators["create-place-popup-form"].toggleButtonState();
  addCardPopUp.open();
});

avatarImage.addEventListener("click", () => {
  formValidators["change-profile-avatar-popup-form"].toggleButtonState();
  changeProfileAvatarPopUp.open();
});
