import React, {Component} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

//Imports components
import Header from './Components/Header';
import PhotoList from './Components/PhotoList';
import NotFound from './NotFound';
import apiKey from './config';

class App extends Component {

  state = {
    search: [],
    title: '',
    firstLoading: true,
    searchLoading: true
  }

  componentDidMount() {
    //Set default topics to display a list of photos on main page
    this.initialLoad(['supercar', 'ferrari', 'lamborghini', 'mclaren']);
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname; //get previous path
    const thisPath = this.props.location.pathname; //get current path
    
    //This lines of code allows a user to navigate between search results
    if (thisPath.includes('/search/')) {
      if (thisPath !== prevPath) {
        const query = thisPath.replace('/search/', '');
        this.getFlickr(query);
      }
    }
  }
  /**
   * This method is called either when a user submits a search form or refresh an URL of search result.
   * It sends a request with the given search keyword, then updates state object with the data in response from Flickr api
   * 
   * @param {string} query - a keyword entered in the Search Form. 
   */
  getFlickr = (query) => {
    this.setState({searchLoading: true});

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=20&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          search: resData.photos.photo,
          searchLoading: false,
          title: query
        });
      })
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  /**
   * This method called right after the render method is called to update the state object with the data of default topics
   * It also checks if the URL has 'search' path. If so, it will pass a keyworld in the URL to getFlickr method.
   * 
   * @param {array} queries - an array of default topic strings 
   */
  initialLoad = (queries) => {
    const apiRequest = [];
    let responses = [];
    const thisPath = this.props.location.pathname;

    //Loops through the array to create variables fetching the Flickr api 
    for(let i = 0; i < queries.length; i++) {
      apiRequest[i] = 
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queries[i]}&per_page=20&format=json&nojsoncallback=1`)
          .then(res => res.json());
    }

    //Once all promises are fulfilled, update the state object with the data in responses from Flickr api
    Promise.all(apiRequest)
      .then(responseData => {

        for (let i = 0; i < queries.length; i++) {
          responses[i] = this.handlePhotoResponse(queries[i], responseData[i]);
        }

        this.setState({
          firstLoading:false
        })
      })
      //If the current URL is search path, request and display the data
      .then(() => {
        if(thisPath.includes('/search/')) {
          const query = thisPath.replace('/search/', '');
          this.getFlickr(query)
        }
      })
      .catch(error => {
        console.log('Error fectching and parsing data', error);
      });
  }

  /**
   * This method is called inside of initialLoad method after all promises successfully get responsed.
   * It updates the state object with the data returned from Flickr api
   * @param {string} searchName - a term used when fetching URL
   * @param {json} imageData - json object from Flickr
   */
  handlePhotoResponse(searchName, imageData) {
    this.setState({
      [searchName]: imageData.photos.photo,
    })
  }

  render() {
    return (
      
        <div className="container">
        <Route render={(props) => <Header performSearch={this.getFlickr}/>} />
        
        <Switch>
          <Route exact path='/' render={() => (this.state.firstLoading) ? <p>Loading...</p> : <PhotoList title="supercar" data={this.state.supercar} />} />
          <Route path='/ferrari' render={() => (this.state.firstLoading) ? <p>Loading...</p> : <PhotoList title="ferrari" data={this.state.ferrari}/>} />
          <Route path='/lamborghini' render={() => (this.state.firstLoading) ? <p>Loading...</p> : <PhotoList title="lamborghini" data={this.state.lamborghini}/>} />
          <Route path='/mclaren' render={() => (this.state.firstLoading) ? <p>Loading...</p> : <PhotoList title="mclaren" data={this.state.mclaren}/>} />
          <Route path='/search' render={() => (this.state.searchLoading) ? <p>Loading...</p> : <PhotoList title={this.state.title} data={this.state.search} />} />
          <Route component={NotFound} />
        </Switch>
        
        </div>
      
    );
  }
}

export default App;