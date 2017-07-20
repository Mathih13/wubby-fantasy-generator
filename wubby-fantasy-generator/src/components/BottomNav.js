import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ShareDialog from './ShareDialog';
import AddContentDialog from './AddContentDialog';

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNav extends Component {
  state = {
    selectedIndex: 0,
  };


  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <ShareDialog style={{ margin: '1em' }} currentSentence={this.props.currentSentence} mainURL={this.props.mainURL} serverURL={this.props.serverURL}/>
          <AddContentDialog style={{ margin: '1em' }} serverURL={this.props.serverURL}/>
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;
