import { apiOptions } from "../utils/constants.js";

export default class Api {
  constructor() {
    // constructor body
    this._baseUrl = apiOptions.baseUrl;
    this._headers = apiOptions.defaultHeaders;
    this._userRoute = `${this._baseUrl}/users/me`;
    this._cardRoute = `${this._baseUrl}/cards`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  async _request(url, options) {
    return await fetch(url, options).then(this._checkResponse);
  }

  // User route methods

  fetchUserInfo() {
    return this._request(this._userRoute, {
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  editUserInfo(name, occupation) {
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
  async getInitialCards() {
    return await this._request(`${this._cardRoute}`, {
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  fetchCurrentCards() {
    return this._request(`${this._cardRoute}`, {
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  fetchCard(cardId) {
    return this._request(`${this._cardRoute}/${cardId}`, {
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
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
        isLiked: true,
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
}
