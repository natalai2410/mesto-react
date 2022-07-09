import React from 'react';
import '../index.css';
import {api} from '../utils/Api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
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
                        <img className="profile__image" alt="Аватар" src={userAvatar}/>
                        <div className="profile__overlay" onClick={props.onEditAvatar}/>
                    </div>
                    <div className="profile__text">
                        <h1 className="profile__title ellipsis-block">{userName}</h1>
                        <button className="profile__btn-edit"
                                type="button"
                                aria-label="Редактировать информацию о профиле" onClick={props.onEditProfile}/>
                        <p className="profile__subtitle ellipsis-block">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__btn-add" type="button" aria-label="Добавить новую карточку"
                        onClick={props.onAddPlace}/>
            </section>

            <section className="places">
                <ul className="places__list">
                    {cards.map((card, _id) => (
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