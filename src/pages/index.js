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

const cardSection = [];

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: function (cardData) {
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

console.log(cardSection);
/* -------------------------------------------------------------------------- */
/*                               Popups                                       */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Edit Popup Form Profile---------------------- */

const profileEditPopup = new PopupWithForm(
  "#profile-edit-popup",
  handleEditProfileFormSubmit
);
profileEditPopup.setEventListeners();

/* --------------------------- Preview Image Popup -------------------------- */

const imagePopUp = new PopUpWithImage("#preview-image-popup");
imagePopUp.setEventListeners();

/* -------------------------- Add Card Popup ------------------------------- */

const addCardPopUp = new PopupWithForm(
  "#add-new-card-popup",
  handleAddCardFormSubmit
);
addCardPopUp.setEventListeners();

/* ---------------------------Confirm Delete Popup-------------------------- */

const confirmDeletePopup = new PopupWithConfirmation(
  "#confirm-image-delete-popup",
  handleDeleteConfirmSubmit
);
confirmDeletePopup.setEventListeners();

/* ------------------------Change Profile Avatar Popup---------------------- */

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

api
  .fetchUserInfo()
  .then((data) => (userData = data))
  .then((data) => {
    userInfoNew.setUserInfo(userData.name, userData.about);
    userInfoNew.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
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
  profileEditPopup.setLoading(true, "Saving...");
  api
    .editUserInfo(data)
    .then(() => {
      userInfoNew.setUserInfo(data);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profileEditPopup.setLoading(false, "Save"));
}

function handleChangeProfileAvatarFormSubmit(data) {
  changeProfileAvatarPopUp.setLoading(true, "Saving...");
  api
    .editUserAvatar(data.link)
    .then(() => {
      userInfoNew.setUserAvatar(data.link);
      changeProfileAvatarPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => changeProfileAvatarPopUp.setLoading(false, "Save"));
}

function handleAddCardFormSubmit(data) {
  addCardPopUp.setLoading(true, "Saving...");
  api
    .addCard(data)
    .then((res) => card)
    .then((card) => {
      console.log("cardData for adding", cardData),
        (cardValue = renderCard(card)),
        cardSection.addItem(cardValue),
        addCardPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardPopUp.setLoading(false, "Create"));
}

function handleDeleteConfirmSubmit(card) {
  confirmDeletePopup.setLoading(true, "Saving...");
  confirmDeletePopup.open();
  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(card)
      .then(() => {
        card.deleteCard(), confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => confirmDeletePopup.setLoading(false, "Yes"));
  });
}

function handleCardLike(card) {
  if (!card.isLiked) {
    api
      .likeCard(card.cardId)
      .then(() => {
        card.updateLikeStatus(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeCard(card.cardId)
      .then(() => {
        card.updateLikeStatus(false);
      })
      .catch((err) => {
        console.error(err);
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
