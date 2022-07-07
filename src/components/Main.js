import React from 'react';
import '../index.css';


function Main() {
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__user">
                        <img className="profile__image" alt="Аватар"/>
                        <div className="profile__overlay"/>
                    </div>
                    <div className="profile__text">
                        <h1 className="profile__title ellipsis-block"/>
                        <button className="profile__btn-edit"
                                type="button"
                                aria-label="Редактировать информацию о профиле"/>
                        <p className="profile__subtitle ellipsis-block"/>
                    </div>
                </div>
                <button className="profile__btn-add" type="button" aria-label="Добавить новую карточку"/>
            </section>
            <section className="places">
                <ul className="places__list">
                </ul>
            </section>
        </main>
    );
}
export default Main;