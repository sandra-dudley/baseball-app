import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  render () {
    return(
      <li className="event-box">{this.props.title} on {this.props.date}</li>
      )
  }
}

export default Event;