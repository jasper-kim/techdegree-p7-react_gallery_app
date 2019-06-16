import React, {Component} from 'react';

import Header from './Components/Header';
import Nav from './Components/Nav';
import PhotoList from './Components/PhotoList';
import SearchForm from './Components/SearchForm';

class App extends Component {
  state = {
    photos: [],
    isLoading: true
  }

  componentDidMount() {
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6ea5cd997f0f7471f9bd804eb468ae8d&text=ferrari&per_page=20&format=json&nojsoncallback=1')
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
        <Header />
        <SearchForm />
        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          <PhotoList data={this.state.photos}/>
        </div>
      </div>
    );
  }
}

export default App;
