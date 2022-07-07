import React from 'react';

import '../index.css';

function ImagePopup() {
    return (
        <div className="popup popup_view-card">
        <figure className="popup__content">
            <button className="popup__btn-close" type="button" aria-label="Выйти из попапа"/>
            <img src="#" className="popup__image" alt="картинка_место"/>
            <figcaption className="popup__caption"/>
        </figure>
    </div>
    )
}

export default ImagePopup;