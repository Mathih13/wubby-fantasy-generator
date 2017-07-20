import React, { Component } from 'react';
import logo from '../logo.jpeg';
import '../App.css';
import GridList from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import TextCard from './textCard';
import ShareDialog from './ShareDialog';



import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainExpanded: true,
      generated: true,
      wubbynames: null,
      sentenceActions: null,
      sentenceObjects: null,
      currentSentence: null,
      loaded: false,
      mainURL: 'http://localhost:8080'

    }

    this.fetchAll();
    this.generateRandomSentence = this.generateRandomSentence.bind(this);
    this.saveAndShare = this.saveAndShare.bind(this);
  }

  fetchAll() {
    var component = this;
    // Fetch WubbyName
    fetch('http://localhost:3000/api/wubbyname', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
      return response.json()
    }).then(function(json) {
      component.setState({ wubbynames: json });
    });

    // Fetch Actions
    fetch('http://localhost:3000/api/sentenceaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
      return response.json()
    }).then(function(json) {
      component.setState({ sentenceActions: json });
    });

    // Fetch Objects
    fetch('http://localhost:3000/api/sentenceobject', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
      return response.json()
    }).then(function(json) {
      component.setState({ sentenceObjects: json, loaded: true });
    });

  }

  // Sentence structure:
  // x would y with z
  // x = reference to w
  // y = action
  // z = object

  // Dataset should be "complete" when recieving from server
  // Objects of xyz in an array
  generateRandomSentence() {
    if (this.state.loaded) {
      var name = this.state.wubbynames[getRandomInt(0, this.state.wubbynames.length-1)].content;
      var action = this.state.sentenceActions[getRandomInt(0, this.state.sentenceActions.length-1)].content;
      var obj = this.state.sentenceObjects[getRandomInt(0, this.state.sentenceObjects.length-1)].content;

      var sentence = 'I want ' + name + ' to ' + action + ' with ' + obj;
      this.setState({ currentSentence: sentence });
    }

  }

  saveAndShare() {

  }



  render() {
    if (this.props.location.pathname != '/') {
      return null;
    }

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <div className="App-header">
          <a href='https://twitter.com/Slothitice/status/880337080064163840' style={{ textDecoration: 'none' }}>
            <img src={logo} className="App-logo" alt="logo" />
            <p style={{ fontSize: '50%', color: '#999'}}>Slothitice Twitter</p>
          </a>
          <h2>PaymoneyWubby Fantasy Generator</h2>
        </div>
        <p className="App-intro">
          Unleash your inner bad content fantasies
        </p>
        {this.state.loaded &&
          <RaisedButton label={'Generate!'}
          primary
          onClick={this.generateRandomSentence}/>
        }

        {this.state.generated &&
          <TextCard expanded={this.state.mainExpanded} cardtext={this.state.currentSentence}/>
        }

        {this.state.currentSentence &&

          <ShareDialog currentSentence={this.state.currentSentence} mainURL={this.state.mainURL}/>
        }


        <GridList>
        </GridList>



      </div>
    );
  }
}

export default FrontPage;
