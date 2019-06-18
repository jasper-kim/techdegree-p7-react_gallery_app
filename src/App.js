import React, {Component} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header';
import PhotoList from './Components/PhotoList';
import NotFound from './NotFound';
import apiKey from './config';

class App extends Component {

  state = {
    search: [],
    title: '',
    isLoading: true
  }

  componentDidMount() {
    this.initialLoad(['supercar', 'ferrari', 'lamborghini', 'mclaren']);
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;   //get previous path
    const thisPath = this.props.location.pathname; //getcurrent path
    
    if (thisPath.indexOf('/search/') > -1) {
      if (thisPath !== prevPath) {
        const query = thisPath.replace('/search/', '');
        this.getFlickr(query);
      }
    }
  }

  getFlickr = (query = 'supercar') => {
    this.setState({isLoading: true});

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=20&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          search: resData.photos.photo,
          isLoading: false,
          title: query
        });
      })
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  initialLoad = (queries) => {
    const apiRequest = [];

    for(let i = 0; i < queries.length; i++) {
      apiRequest[i] = 
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${queries[i]}&per_page=20&format=json&nojsoncallback=1`)
          .then(res => res.json());
    }

    Promise.all(apiRequest)
      .then(responseData => {
        for (let i = 0; i < queries.length; i++) {
          this.handlePhotoResponse(queries[i], responseData[i]);
        }
      })
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  handlePhotoResponse(searchName, imageData) {
    this.setState({
      [searchName]: imageData.photos.photo,
      isLoading: false
    })
  }

  render() {
    return (
      
        <div className="container">
        <Route render={(props) => <Header performSearch={this.getFlickr}/>} />
        
        <Switch>
          <Route exact path='/' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="supercar" data={this.state.supercar} />} />
          <Route path='/ferrari' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="ferrari" data={this.state.ferrari}/>} />
          <Route path='/lamborghini' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="lamborghini" data={this.state.lamborghini}/>} />
          <Route path='/mclaren' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title="mclaren" data={this.state.mclaren}/>} />
          <Route path='/search' render={() => (this.state.isLoading) ? <p>Loading...</p> : <PhotoList title={this.state.title} data={this.state.search} />} />
          <Route component={NotFound} />
        </Switch>
        
        </div>
      
    );
  }
}

export default App;


