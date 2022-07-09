import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";


import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

/**
 * @return {boolean}
 */
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <>
            <div className="page">
                <div className="page__content">
                    < Header/>
                    < Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
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
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
