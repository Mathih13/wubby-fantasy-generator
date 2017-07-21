import React, { Component } from 'react';
import logo from '../logo.jpeg';
import '../App.css';
import GridList from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import TextCard from './textCard';
import MetaTags from 'react-meta-tags';
import {Helmet} from "react-helmet";


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
      quote: null,
      serverURL: 'http://139.59.186.52:3000'
    }

  }


  componentWillMount() {
    var component = this;
    if (this.props.match.params.id) { // We have an id, let's get it from server
      fetch(this.state.serverURL + '/api/getQuote', {
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </div>
          {this.state.quote != null &&
            <TextCard expanded={this.state.mainExpanded} cardtext={'"' + this.state.quote + '"'}/>
          }

          {this.state.quote == null &&
            <p>Having some trouble finding that quote...</p>
          }


          <a href="http://139.59.186.52"> Generate your own filth! </a>

      </div>
    );
  }

}

export default SingleCard;
