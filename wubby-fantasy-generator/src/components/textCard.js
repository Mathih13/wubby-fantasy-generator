import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class TextCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
      className="Generated-Text"
      style={{ margin: '1em' }}
      expanded={this.props.expanded}
      >
        <CardHeader
          textStyle={{ paddingRight: 0 }}
        />
        <CardText
        expandable={true}
        style={{ paddingRight: 0, marginRight: '4em', marginLeft: '4em', fontSize: 20 }}
        >
          {this.props.cardtext}
        </CardText>
      </Card>
    );
  }
}

export default TextCard;
