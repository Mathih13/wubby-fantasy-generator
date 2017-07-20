import React, { Component } from 'react';
import logo from '../logo.jpeg';
import '../App.css';
import GridList from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import TextCard from './textCard';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainExpanded: true,
      generated: true,
      quote: ''
    }

  }


  componentWillMount() {
    var component = this;
    if (this.props.match.params.id) { // We have an id, let's get it from server
      fetch('http://localhost:3000/api/getQuote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.props.match.params.id
          })
        }).then(function(response) {
        return response.json()
      }).then(function(json) {
        if (json.success) {
          component.setState({ quote: json.text });
        }
      });
    }
  }


  render() {
    return (
      <div className="App">
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@nytimesbits" />
      <meta name="twitter:creator" content="@nickbilton" />
      <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
      <meta property="og:title" content="A Twitter for My Sister" />
      <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
      <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </div>

          <TextCard expanded={this.state.mainExpanded} cardtext={'"' + this.state.quote + '"'}/>



      </div>
    );
  }

}

export default SingleCard;
