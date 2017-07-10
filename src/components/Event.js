import React, { Component } from 'react';
import moment from 'moment';
import EventContent from './EventContent';
import './Events.css';

class Event extends Component {
  constructor(props) {
      super(props);
      this.init = this.init.bind(this)
  }
  init() {
    console.log(this.props.date)
  }
  render () {
    const event = this.props.event;    
    const venue = this.props.event.venue ? this.props.event.venue : 'loading...';
    const time = moment(event.datetime_local).format('llll');

    return(
      <div className = "col-md-3 event-card">
          <EventContent event={this.props.event} />
      </div>
      )
  }
}

export default Event;