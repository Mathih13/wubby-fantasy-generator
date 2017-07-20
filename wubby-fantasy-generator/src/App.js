import React, { Component } from 'react';
import logo from './logo.jpeg';
import './App.css';
import FrontPage from './components/FrontPage';
import SingleCard from './components/SingleCard';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainExpanded: true,
      generated: true,
      mainURL: 'http:/localhost:8080'
    }

  }



  render() {

    return (
      <Router>
        <div>
          <Route path="/" component={FrontPage}/>
          <Route path="/card/:id" component={SingleCard}/>
        </div>
      </Router>
    );
  }





}

export default App;
