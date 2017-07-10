import React, { Component } from 'react';
import moment from 'moment';
import './Events.css';

class EventContent extends Component {
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
    const city = (typeof event === "object") ? ", "+event.venue.city : ''
    return(
        <div>
        <h3>{this.props.event.short_title}</h3>
        <p className="text-muted event-time">
          {time}</p>
        <p className="text-muted event-venue-name">
          {venue.name}{city}
        </p>
        <p><a className="btn btn-primary" href={this.props.event.url} target="_blank">Get ticket</a></p>
        </div>
      )
  }
}

export default EventContent;