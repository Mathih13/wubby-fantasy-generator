import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';

import ControlledTextField from './ControlledTextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      link: null,
      prevSentence: null
    }

  }


  handleOpen = () => {
    if (this.state.prevSentence === this.props.currentSentence) {
      this.setState({open: true});
      return;
    }

    var component = this;
    this.setState({open: true});
    // Save dat link
    fetch('http://localhost:3000/api/saveQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quote: this.props.currentSentence
        })
      }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json.success) {
        component.setState({ link: component.props.mainURL + '/card/' + json.id, prevSentence: component.props.currentSentence });
        document.getElementById('text-field-controlled').select();

      }
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
      <IconButton
      tooltip="Save and Share"
      onClick={this.handleOpen}
      >
        <Send />
      </IconButton>
        <Dialog
          title="Share Your Quote!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Copy the link below:
        {this.state.link &&
          <ControlledTextField value={this.state.link} />
        }

        </Dialog>
      </div>
    );
  }
}
