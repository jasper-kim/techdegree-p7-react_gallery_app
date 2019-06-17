import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/ferrari'>Ferrari</NavLink></li>
                <li><NavLink to='/lamborghini'>Lamborghini</NavLink></li>
                <li><NavLink to='/mclaren'>Mclaren</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;