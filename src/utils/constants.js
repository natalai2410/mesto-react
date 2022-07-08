export const baseUrl = 'https://nomoreparties.co/v1/cohort-43/';

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
};

export const profileConfig = {nameSelector: ".profile__title", jobSelector: ".profile__subtitle", imgSelector: ".profile__image"};
export const popupViewConfig = {linkSelector: '.popup__image', nameSelector: '.popup__caption'};

export const popupOpenButton = document.querySelector('.profile__btn-edit');
export const buttonAddCard = document.querySelector('.profile__btn-add');

export const inputName = document.querySelector('.popup__input_title');
export const inputJob = document.querySelector('.popup__input_job');


export const popupEditAvatarButton = document.querySelector('.profile__overlay');
