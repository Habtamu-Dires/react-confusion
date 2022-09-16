import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main  from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

  render(){
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;



