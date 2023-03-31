import './App.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {

  state = {
    query: ''
  };

  handleSearchbarSubmit = SearchbarQuery => {
    this.setState({ query: SearchbarQuery});
  };

  render() {
    return (
      <>
        <ToastContainer />
        <Searchbar searchbarToAppQuery={this.handleSearchbarSubmit}/>
        <ImageGallery query={this.state.query}/>
      </>
    );
  };
};


export default App;

// create class with state and component tree
