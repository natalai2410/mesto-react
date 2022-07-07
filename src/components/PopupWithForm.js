import React from 'react';

import '../index.css';

//Проще всего объявить React-компонент как функцию:
function PopupWithForm(props) {

    // возращвет eact-элемент
    return (
        <div className={`popup popup_${props.name}  ${props.isOpen ? `popup_opened`: ""}`} onClick={props.onClose}>
            {/*//элементы внешнего контейнера*/}
            <div className="popup__content popup__content_common">
                {/*//элементы внутреннего контейнера*/}
                <button className="popup__btn-close" type="button" aria-label="Выйти из попапа"/>
                {/*//кнопка 2*/}
                <h2 className="popup__title">{props.title}</h2>
                {/*//заголовок*/}
                <form className="popup__form" name={props.form} noValidate>
                    {/*//сама форма*/}
                    {props.children}
                    <button className="popup__btn-save" type="submit">{props.buttonText}</button>
                    {/*//кнопка 1*/}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;