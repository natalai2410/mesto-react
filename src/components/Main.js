import React from 'react';
import '../index.css';
import {api} from '../utils/Api';
import Card from './Card';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const [cards, setCards] = React.useState([]);
    //Подписываемся на контекст currentUser
    const currentUser = React.useContext(CurrentUserContext);

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
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;