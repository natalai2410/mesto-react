import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";


import PopupWithForm from './PopupWithForm';

/**
 * @return {boolean}
 */
function App() {
    //переменные состояния, отвечающие за видимость трёх попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

    return (
        <>
            <div className="page">
                < Header/>
                < Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}

            />
                < Footer/>
                <PopupWithForm name="edit-profile" title='Редактировать профиль' buttonText='Сохранить'
                               isOpen={isEditProfilePopupOpen}
                               onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input popup__input_title"
                               type="text"
                               name='input-title'
                               id="input-title"
                               required
                               minLength="2"
                               maxLength="40"/>
                        <span className="popup__error"
                              id="input-title-error"/>
                    </label>
                    <label className="popup__field">
                        <input className="popup__input popup__input_job"
                               type="text" name='input-job'
                               id="input-job"
                               required
                               minLength="2"
                               maxLength="200"/>
                        <span className="popup__error"
                              id="input-job-error"/>
                    </label>
                </PopupWithForm>
                <PopupWithForm name="new-card" title='Новое место' buttonText='Сохранить'
                               isOpen={isEditAvatarPopupOpen}
                               onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input popup__input_place"
                               type="text"
                               name='input-place'
                               placeholder="Название"
                               id="input-place"
                               required
                               minLength="2"
                               maxLength="30"/>
                        <span className="popup__error"
                              id="input-place-error">
                      	</span>
                    </label>
                    <label className="popup__field">
                        <input className="popup__input popup__input_link"
                               type="url"
                               name='input-link'
                               placeholder="Ссылка на картинку"
                               id="input-link"
                               required/>
                        <span className="popup__error"
                              id="input-link-error"/>
                    </label>
                </PopupWithForm>
                <PopupWithForm name="edit-avatar" title='Обновить аватар' buttonText='Сохранить'
                               isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input popup__input_avatar-link"
                               type="url"
                               name='avatar-link'
                               placeholder="Ссылка на картинку"
                               id="avatar-link"
                               required/>
                        <span className="popup__error"
                              id="avatar-link-error"/>
                    </label>
                </PopupWithForm>
                <PopupWithForm name="delete-card" title='Вы уверены?' buttonText='Да'>
                </PopupWithForm>


                {/*<template className="template" id="template-place-item">*/}
                {/*    <li className="place-item">*/}
                {/*        <button className="place-item__bin" type="button" aria-label="Корзина"/>*/}
                {/*        <img src="#" className="place-item__image" alt="картинка_место_загрузка"/>*/}
                {/*        <div className="place-item__content">*/}
                {/*            <h2 className="place-item__title ellipsis-block"/>*/}
                {/*            <div className="place-item__content-like">*/}
                {/*                <button className="place-item__like" type="button" aria-label="Лайк"/>*/}
                {/*                <p className="place-item__count-like">0</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </li>*/}
                {/*</template>*/}
            </div>
        </>
    );
}

export default App;
