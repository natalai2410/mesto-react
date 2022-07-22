import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";


import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";


//4 экспортируйте из ../contexts/CurrentUserContext CurrentUserContext - объект контента
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";



/**
 * @return {boolean}
 */
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null);

  //1 В компоненте App создайте переменную состояния currentUser  в useState - объект
    const  [ currentUser, setCurrentUser] = React.useState({});


    //2 эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения.
    React.useEffect(() => {
        Promise.all([api.getUserInfo()])
            .then( ([userData])=> {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick(e) {
        e.stopPropagation();
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
    
    function handleUpdateUser (data) {
        api.sendUserInfo(data.name, data.about)
            .then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups();
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data.avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            }).catch((err) => {
            console.error(err);
        });
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <PopupWithForm name="new-card" title='Новое место' buttonText='Сохранить'
                                   isOpen={isAddPlacePopupOpen}
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
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <PopupWithForm name="delete-card" title='Вы уверены?' buttonText='Да'>
                    </PopupWithForm>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
