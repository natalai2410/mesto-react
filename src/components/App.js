import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

/**
 * @return {boolean}
 */
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards() ])
            .then( ([userData, cards])=> {
                setCurrentUser(userData);
                setCards(cards);
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

    function handlePopupCloseClick(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
        api.putLike(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
        } else {
            api.deleteLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleAddPlaceSubmit(data) {
        console.log(data.name);
        console.log(data.link);
        api.addNewCard( data.name,  data.link,)
            .then((newCard) => {
            setCards([newCard, ...cards]);
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
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    < Footer/>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={handlePopupCloseClick}
                        onUpdateUser={handleUpdateUser}
                        onCloseCross = {closeAllPopups}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={handlePopupCloseClick}
                        onSubmit={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={handlePopupCloseClick}
                        onUpdateAvatar={handleUpdateAvatar}
                        onCloseCross = {closeAllPopups}
                    />
                    <PopupWithForm name="delete-card" title='Вы уверены?' buttonText='Да'>
                    </PopupWithForm>
                    <ImagePopup
                        card={selectedCard}
                        onClose={handlePopupCloseClick}
                        onCloseCross = {closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
