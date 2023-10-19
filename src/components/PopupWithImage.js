import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        
    }

    open(data) {
       // set the image's src and alt
       // set the caption's textContent
        super.open();
    }
}