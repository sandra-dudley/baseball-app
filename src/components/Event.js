import React, { Component } from 'react';
import moment from 'moment';
import styles from './Events.css';

class Event extends Component {
  render () {
    const event = this.props.event;    
    const venue = this.props.event.venue ? this.props.event.venue : 'loading...';
    const time = moment(event.datetime_local).calendar();

    return(
      <li className="event-card">
        <h3>{this.props.event.short_title}</h3>
        <p className="text-muted event-time">
          {time}</p>
        <p className="text-muted event-venue-name">
          {venue.name}
        </p>
      </li>
      )
  }
}

export default Event;