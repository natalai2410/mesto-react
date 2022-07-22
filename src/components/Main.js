import React from 'react';
import '../index.css';
import {api} from '../utils/Api';
import Card from './Card';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const [cards, setCards] = React.useState([]);
    //Подписываемся на контекст currentUser
    const currentUser = React.useContext(CurrentUserContext);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
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

    React.useEffect(() => {
        Promise.all([api.getInitialCards()])
            .then(([ cards]) => {
                setCards([...cards]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__user">
                        <img className="profile__image" alt="Аватар" src={currentUser.avatar}/>
                        <div className="profile__overlay" onClick={props.onEditAvatar}/>
                    </div>
                    <div className="profile__text">
                        <h1 className="profile__title ellipsis-block">{currentUser.name}</h1>
                        <button className="profile__btn-edit"
                                type="button"
                                aria-label="Редактировать информацию о профиле" onClick={props.onEditProfile}/>
                        <p className="profile__subtitle ellipsis-block">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__btn-add" type="button" aria-label="Добавить новую карточку"
                        onClick={props.onAddPlace}/>
            </section>

            <section className="places">
                <ul className="places__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            name={card.name}
                            link={card.link}
                            likes={card.likes.length}
                            onCardClick={props.onCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;