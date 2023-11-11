import { initialCards, apiOptions } from "../utils/constants.js";

export default class Api {
  constructor() {
    // constructor body
    this._baseUrl = apiOptions.baseUrl;
    this._headers = apiOptions.defaultHeaders;
    this._userRoute = `${this._baseUrl}/users/me`;
    this._cardRoute = `${this._baseUrl}/cards`;
    this._checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    };
  }

  async _request(url, options) {
    console.log(options);
    return await fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    initialCards
      .forEach((card) => {
        return this._request(this._userRoute, {
          method: "GET",
          headers: this._defaultHeaders,
          body: JSON.stringify({
            name: card.location,
            link: card.link,
          }),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // User route methods

  fetchUser() {
    return this._request(this._userRoute, {
      method: "GET",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  editUser(name, occupation) {
    return this._request(this._userRoute, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: occupation,
      }),
    }).catch((err) => {
      console.error(err);
    });
  }
  editUserAvatar(link) {
    return this._request(`${this._userRoute}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).catch((err) => {
      console.error(err);
    });
  }

  // Card route methods
  fetchCards() {
    return this._request(`${this._cardRoute}`, {
      method: "GET",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  clearAllCards() {
    return this._request(`${this._cardRoute}`, {
      method: "GET",
      headers: this._headers,
    })
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          console.log("deleting card with id", item._id);
          this.deleteCard(item._id);
        });
        console.log("all cards should be deleted");
      });
  }

  async fetchCardIdObject() {
    await this.fetchCards().then((data) => {
      let idObject = data;
      return idObject;
    });
  }

  async deleteAllCards(idObject) {
    console.log("type of idObject is", typeof idObject);

    const map = new Map(idObject);
    console.log(map);
    // await idObject.forEach((item) => {
    //   console.log('item is ', item);
    //   api.deleteCard(item._id);
    //   });
  }

  addCard(card) {
    return this._request(`${this._cardRoute}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.location,
        link: card.link,
      }),
    }).catch((err) => {
      console.error(err);
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._cardRoute}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  likeCard(cardId) {
    return this._request(`${this._cardRoute}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        isLiked: true
      }),
    }).catch((err) => {
      console.error(err);
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._cardRoute}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  // other methods for working with the API
}

// const api = new Api({
//   baseUrl: this._baseUrl,
//   headers: this._defaultHeaders,
// });
