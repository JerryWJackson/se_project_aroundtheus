export default class Popup {
    constructor({ popupSelector }){
        this._popupElement = document.querySelector(popupSelector); 
    }

    open() {
        // opens popup
    }

    close() {
        //closes popup
    }

    _handleEscClose() {
        // listens for the esc keypress
    }

    _setEventListeners() {
        // sets even listeners
    }
}