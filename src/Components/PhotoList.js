import React from 'react';
import Photo from './Photo';
import NoPhoto from './NoPhoto';

const PhotoList = (props) => {
    //Two variables, one is an array to store the data through props from App compenent.
    //The other one is to store Photo components created by iteration of the first variable.
    const result = props.data;
    let photos;

    //If the lengh of the array, which is the data from Flickr API, greater than 0, 
    //Iterate the array, create a series of Photo components and assign it to photos variable.
    //Otherwise, photos variable store NoPhoto component
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