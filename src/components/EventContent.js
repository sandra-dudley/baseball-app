import React, { Component } from 'react';
import moment from 'moment';
import './Events.css';

class EventContent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        id: "event"+this.props.event.id
      }
      this.displayStar = this.displayStar.bind(this);
      this.toggle = this.toggle.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.event.id !== this.props.event.id) {
    this.setState({id: "event"+this.props.event.id})
    }
  }
  displayStar() {
    var currStorage = JSON.parse(localStorage.getItem('baseballApp'));
    var isFav = currStorage.indexOf(this.props.event.id) > -1;
    var initClass = (isFav) ? "btn btn-primary" : "btn";
    var initStar = (isFav) ? "fa fa-star" : "fa fa-star-o";
    var star = <button 
      id={this.state.id} 
      className={initClass} 
      onClick={this.toggle}>
        <i className={initStar} aria-hidden="true"></i>
    </button>;
    return star;
  }
  toggle(event) {
    var currStorage = JSON.parse(localStorage.getItem('baseballApp'));
    if (event.target.classList.contains("btn-primary")) {
      event.target.classList.remove("btn-primary");
      var index = currStorage.indexOf(this.props.event.id);
      if (index > -1) {
          currStorage.splice(index, 1);
      }
    } else {
      event.target.classList.add("btn-primary");
      currStorage.push(this.props.event.id);
    }
    localStorage.setItem('baseballApp',JSON.stringify(currStorage))
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
        <p>
        <a className="btn btn-primary" href={this.props.event.url} target="_blank">
          Get ticket
        </a>&nbsp; 
        {(this.props.localStorage) ?  this.displayStar() : ''}</p>
        </div>
      )
  }
}

export default EventContent;