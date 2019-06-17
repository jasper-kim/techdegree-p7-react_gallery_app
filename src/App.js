import React, {Component} from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header';
import PhotoList from './Components/PhotoList';
import NotFound from './NotFound';
import apiKey from './config';

class App extends Component {

  state = {
    photos: [],
    ferrari: [],
    lamborghini: [],
    mclaren: [],
    title: '',
    isLoading: true
  }

  componentDidMount() {
    this.getFlickr();
    this.getFlickr('ferrari');
    this.getFlickr('lamborghini');
    this.getFlickr('mclaren');
  }
  
  getFlickr = (query = 'supercar') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=20&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(resData => {
        if(query === 'ferrari') {
          this.setState({
            ferrari: resData.photos.photo,
            isLoading: false
          });
        } else if (query === 'lamborghini') {
          this.setState({
            lamborghini: resData.photos.photo,
            isLoading: false
          });
        } else if (query === 'mclaren') {
          this.setState({
            mclaren: resData.photos.photo,
            isLoading: false
          });
        } else {
          this.setState({
            photos: resData.photos.photo,
            isLoading: false,
            title: query
          });
        }
      })
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <Header performSearch={this.getFlickr}/>
        <Switch>
          <Route exact path='/' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="supercar" data={this.state.photos} />} />
          <Route path='/ferrari' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="ferrari" data={this.state.ferrari}/>} />
          <Route path='/lamborghini' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="lamborghini" data={this.state.lamborghini}/>} />
          <Route path='/mclaren' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="mclaren" data={this.state.mclaren}/>} />
          <Route path='/search/' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title={this.state.title} data={this.state.photos} />} />
          <Route component={NotFound} />
        </Switch>
        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
