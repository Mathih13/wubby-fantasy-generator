import React from 'react';
import TextField from 'material-ui/TextField';

export default class ControlledTextField extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          value={this.props.value}
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}
