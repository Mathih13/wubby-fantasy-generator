import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Build from 'material-ui/svg-icons/action/build';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';



import ControlledTextField from './ControlledTextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class AddContentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackbar: false,
    }



  }


  handleOpen = () => {

    this.setState({open: true});

  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRequestClose = () => {
    this.setState({snackba: false});
  }

  handleSubmit = () => {
    var wubbyname = document.getElementById('text-field-wubbyname').value;
    var sentenceaction = document.getElementById('text-field-sentenceacion').value;
    var sentenceobject = document.getElementById('text-field-sentenceobject').value;

    if (wubbyname != '') {
      fetch(this.props.serverURL + '/api/saveWubbyName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            wubbyname: wubbyname
          })
        }).then(function(response) {
        return response.json()
      }).then(function(json) {

      });
    }

      if (sentenceaction != '') {
        fetch(this.props.serverURL + '/api/saveAction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: sentenceaction
            })
          }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
          }
        });
      }




    if (sentenceobject != '') {
      console.log('posting');
      fetch(this.props.serverURL + '/api/saveSentenceObject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sentenceObject: sentenceobject
          })
        }).then(function(response) {
          console.log(response);
        return response.json()
      }).then(function(json) {
        console.log(json);
        if (json.success) {
        }
      });
    }

    this.setState({snackbar: true})
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
      <IconButton
      tooltip="Add your own pieces!"
      onClick={this.handleOpen}
      >
        <Build />
      </IconButton>
        <Dialog
          title="Add pieces to the generator"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="text-field-wubbyname"
            value={this.props.value}
            style={{ width: '100%' }}
            hintText="A name alternative for PaymoneyWubby"
          />
          <TextField
            id="text-field-sentenceacion"
            value={this.props.value}
            style={{ width: '100%' }}
            hintText='An action eg. "destroy me"'
          />
          <TextField
            id="text-field-sentenceobject"
            value={this.props.value}
            style={{ width: '100%' }}
            hintText='An object eg. "a bag of dicks"'
          />
          <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
        </form>

        <Snackbar
          open={this.state.snackbar}
          message="New pieces added!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

        </Dialog>
      </div>
    );
  }
}
