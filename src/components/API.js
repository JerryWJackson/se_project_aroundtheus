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
    });
  }

  editUserInfo({ name, about }) {
    return this._request(this._userRoute, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
  editUserAvatar(link) {
    return this._request(`${this._userRoute}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  // Card route methods
  async getInitialCards() {
    return await this._request(`${this._cardRoute}`, {
      headers: this._headers,
    });
  }

  fetchCurrentCards() {
    return this._request(`${this._cardRoute}`, {
      headers: this._headers,
    });
  }

  addCard(card) {
    return this._request(`${this._cardRoute}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  deleteCard(card) {
    return this._request(`${this._cardRoute}/${card.cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(id) {
    return this._request(`${this._cardRoute}/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        isLiked: true,
      }),
    });
  }

  dislikeCard(id) {
    return this._request(`${this._cardRoute}/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
