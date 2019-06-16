import React from 'react';

const Photo = (props) => {
    const farm = props.farm;
    const server = props.server;
    const id = props.id;
    const secret = props.secret;
    const title = props.title

    return (
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
        </li>
    );
}

export default Photo;