import React, {Component} from 'react';

import Nav from './Components/Nav';
import PhotoList from './Components/PhotoList';
import SearchForm from './Components/SearchForm';
import apiKey from './config';

class App extends Component {
  state = {
    photos: [],
    isLoading: true
  }

  componentDidMount() {
    this.performSearch();
  }
  
  performSearch = (query = 'ferrari') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=20&format=json&nojsoncallback=1`)
    .then(res => res.json())
      .then(resData => this.setState({
        photos: resData.photos.photo,
        isLoading: false
      }))
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Famous Motor Gallery</h1>
        <SearchForm onSubmit={this.performSearch}/>
        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          {
            (this.state.isLoading) ?
            <p>Loading...</p> :
            <PhotoList data={this.state.photos}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
