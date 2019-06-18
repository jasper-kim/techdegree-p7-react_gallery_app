import React from 'react';
import Photo from './Photo';
import NoPhoto from './NoPhoto';

const PhotoList = (props) => {
    const result = props.data;
    let photos;
    if(result.length > 0) {
        photos = result.map(photo => (<Photo key={photo.id} farm={photo.farm} server={photo.server} id={photo.id} secret={photo.secret} title={photo.title} />));
    } else {
        photos = <NoPhoto />;
    }
    

    return (
        
        <div className="photo-container">
          <h2>{props.title}</h2>
            <ul>
                {photos}
            </ul>
        </div>
    );
};

export default PhotoList;