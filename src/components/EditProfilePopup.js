import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);


    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            input_title: name,
            input_job: description,
        });
    }

    return(
        <PopupWithForm name="edit-profile" title='Редактировать профиль' buttonText='Сохранить'
                       onSubmit={handleSubmit}
                       isOpen={props.isOpen}
                       onClose={props.onClose}>
            <label className="popup__field">
                <input className="popup__input popup__input_title"
                       type="text"
                       name="input-title"
                       value={name}
                       id="input_title"
                       required
                       minLength="2"
                       maxLength="40"
                       onChange={handleNameChange}
                />
                <span className="popup__error"
                      id="input-title-error"/>
            </label>
            <label className="popup__field">
                <input className="popup__input popup__input_job"
                       type="text"
                       name='input-job'
                       value={description}
                       id="input_job"
                       required
                       minLength="2"
                       maxLength="200"
                       onChange={ handleDescriptionChange}
                />
                <span className="popup__error"
                      id="input-job-error"/>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;