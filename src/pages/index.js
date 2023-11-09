import {
  validationSettings,
  profileName,
  profileDescription,
  profileAvatar,
  profileEditButton,
  addNewCardButton,
  initialCards,
  apiOptions
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/API.js"
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

const formValidators = {}

// enable validation
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement)
    const formName = formElement.id
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationSettings);

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

const userInfoNew = new UserInfo(profileName, profileDescription, profileAvatar);

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
  formValidators["profile-edit-popup-form"].resetValidation();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  formValidators["create-place-popup-form"].toggleButtonState();
  addCardPopUp.open();
});


// The code below all 'works'; when you start studying tomorrow work through it again and continue.
const api = new Api(apiOptions);

// const avatarLink = new URL('https://github.com/JerryWJackson/se_project_aroundtheus/blob/create-rest-api_sprint9/src/images/jwj-avatar.png');
// api.editUserAvatar(avatarLink).then((res)=> console.log(res));
// api.editUser('Jerry W Jackson', 'Renaissance Man').then((res)=> console.log(res));
const cardsInitial = api.getInitialCards().then((res) => console.log(res));
