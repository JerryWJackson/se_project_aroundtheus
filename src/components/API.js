export default class Api {
  constructor({baseUrl, defaultHeaders}) {
    // constructor body
    this._baseUrl = baseUrl;
    this._defaultHeaders = defaultHeaders;
    this._userRoute = `${this._baseUrl}/users/me`;
    this._cardRoute = `${this._baseUrl}/cards`;
  }

  getInitialCards() {
    return fetch(this._cardRoute, {
      method: "GET",
      headers: this._defaultHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log('Got initial cards');
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // User route methods

  fetchUser() {
    return fetch(this._userRoute, {
      method: "GET",
      headers: this._defaultHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  editUser(name, occupation) {
    return fetch(this._userRoute, {
      method: "PATCH",
      headers: this._defaultHeaders,
      body: JSON.stringify({
        'name': name,
        'about': occupation
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  editUserAvatar(link) {
    return fetch(`${this._userRoute}/avatar`, {
      method: "PATCH",
      headers: this._defaultHeaders,
      body: JSON.stringify({
        'avatar': link
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Card route methods
  fetchCards() {
    return fetch(`${this._cardRoute}`, {
      method: "GET",
      headers: this._defaultHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addCard(card) {
    return fetch(`${this._cardRoute}`, {
      method: "POST",
      headers: this._defaultHeaders,
      body: JSON.stringify({
        'location': card.location,
        'link': card.link
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._cardRoute}/${cardId}`, {
      method: "DELETE",
      headers: this._defaultHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  likeCard(cardId) {
    return fetch(`${this._cardRoute}/${cardId}/likes`, {
      method: "PUT",
      headers: this._defaultHeaders,
      body: JSON.stringify({
        // how do I change a boolean in a PUT body?
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this._cardRoute}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._defaultHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // other methods for working with the API
}

// const api = new Api({
//   baseUrl: this._baseUrl,
//   headers: this._defaultHeaders,
// });
