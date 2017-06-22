import React, { Component } from 'react';

class Event extends Component {
  render () {
    return(
      <li>{this.props.short_title}</li>
      )
  }
}

export default Event;