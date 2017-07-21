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
      <MetaTags>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@flickr" />
        <meta name="twitter:title" content="Small Island Developing States Photo Submission" />
        <meta name="twitter:description" content="View the album on Flickr." />
        <meta name="twitter:image" content="https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg" />
      </MetaTags>
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
