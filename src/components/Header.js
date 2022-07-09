import React from 'react';
import headerLogo from '../images/logo_d.svg';
import '../index.css';

function Header() {
    return (
        <div className="header">
            <img className="logo" src={headerLogo} alt="логотип"/>
        </div>
    );
}

export default Header;