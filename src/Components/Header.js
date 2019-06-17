import React from 'react';
import SearchForm from './SearchForm';
import Nav from './Nav';

const Header = (props) => {
    return(
        <React.Fragment>
            <h1>Famous Motor Gallery</h1>
            <SearchForm onSearch={props.performSearch} />
            <Nav />
        </React.Fragment>
        
    );
}

export default Header;