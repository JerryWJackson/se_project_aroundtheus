import {
  apiOptions,
  validationSettings,
  formList,
  profileName,
  profileDescription,
  profileAvatar,
  profileEditButton,
  addNewCardButton,
  avatarEditButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

const confirmDeletePopup = new PopupWithConfirmation(
  "#confirm-image-delete-popup",
  handleDeleteConfirmSubmit
);
confirmDeletePopup.setEventListeners();

/* ------------------------Change Profile Avatar Popup----------------------- */

const changeProfileAvatarPopUp = new PopupWithForm(
  "#change-profile-avatar-popup",
  handleChangeProfileAvatarFormSubmit
);
changeProfileAvatarPopUp.setEventListeners();

const userInfoNew = new UserInfo(
  profileName,
  profileDescription,
  profileAvatar
);

api.fetchUserInfo().then((data) => {
  let userData = data;
  userInfoNew.setUserInfo(userData.name, userData.about);
  userInfoNew.setUserAvatar(userData.avatar);
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteConfirmSubmit,
    handleCardLike
  );
  return card.getView();
}

function handleImageClick(data) {
  imagePopUp.open(data);
}

function handleEditProfileFormSubmit(data) {
  profileEditPopup.setLoading('Saving...');
  userInfoNew.setUserInfo(data);
  api.editUserInfo(data).then(() => {
    profileEditPopup.close();
  }).finally(() => profileEditPopup.setLoading('Save'));
}

function handleChangeProfileAvatarFormSubmit(data) {
  changeProfileAvatarPopUp.setLoading('Saving...')
  userInfoNew.setUserAvatar(data.link);
  api.editUserAvatar(data.link).then(() => {
    changeProfileAvatarPopUp.close();
  }).finally(() => changeProfileAvatarPopUp.setLoading('Save'));
}

function handleAddCardFormSubmit(data) {
  addCardPopUp.setLoading('Saving...');
  const cardValue = renderCard(data);
  cardSection.addItem(cardValue);
  api
    .addCard(data)
    .then(() => {
      addCardPopUp.close();
    })
    .finally(() => addCardPopUp.setLoading('Create'));
}

function handleDeleteConfirmSubmit(card) {
  confirmDeletePopup.open();
  confirmDeletePopup.setSubmitAction(() => {
    api.deleteCard(card);
    card.handleDeleteCard();
    confirmDeletePopup.close();
  });
}

function handleCardLike(card) {
  if (!card.isLiked) {
    api.likeCard(card.cardId).then(() => {
      card.updateLikeStatus(true);
    });
  } else {
    api.dislikeCard(card.cardId).then(() => {
      card.updateLikeStatus(false);
    });
  }
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

avatarEditButton.addEventListener("click", () => {
  formValidators["change-profile-avatar-popup-form"].toggleButtonState();
  changeProfileAvatarPopUp.open();
});

// api.likeCard(`6552765e5975730019931648`);
