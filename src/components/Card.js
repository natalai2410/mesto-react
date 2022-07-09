import React from 'react';
import '../index.css';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
        console.log(props.card);
    }

    return (
        <li className="place-item">
            <button className="place-item__bin" type="button" aria-label="Корзина"/>
            <img src={props.link} className="place-item__image" alt={props.name} onClick={handleClick}/>
            <div className="place-item__content">
                <h2 className="place-item__title ellipsis-block">{props.name}</h2>
                <div className="place-item__content-like">
                    <button className="place-item__like" type="button" aria-label="Лайк"/>
                    <p className="place-item__count-like">{props.likes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;