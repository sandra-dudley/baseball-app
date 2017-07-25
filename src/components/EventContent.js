import React, { Component } from 'react';
import moment from 'moment';
import './Events.css';

class EventContent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        id: "event"+this.props.event.id,
        starId: "star"+this.props.event.id
      }
      this.displayStar = this.displayStar.bind(this);
      this.toggle = this.toggle.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.event.id !== this.props.event.id) {
    this.setState({id: "event"+this.props.event.id, starId: "star"+this.props.event.id})
    console.log("id", this.props.event.id);
    }
  }
  displayStar() {
    var currStorage = JSON.parse(localStorage.getItem('baseballApp'));
    var isFav = (currStorage === null) ? false : currStorage.indexOf(this.props.event.id) > -1;
    var initClass = (isFav) ? "btn btn-primary" : "btn";
    var initStar = (isFav) ? "fa fa-star" : "fa fa-star-o"
    var star = <button 
      id={this.state.id} 
      className={initClass} 
      onClick={this.toggle}>
        <i className={initStar} id={this.state.starId} aria-hidden="true"></i>
    </button>;
    return star;
  }
  toggle(event) {
    console.log("click");
    var currStorage = JSON.parse(localStorage.getItem('baseballApp'));
    if (document.getElementById("event"+this.props.event.id).classList.contains("btn-primary")) {
      document.getElementById("event"+this.props.event.id).classList.remove("btn-primary");
      document.getElementById("star"+this.props.event.id).classList.remove("fa-star");
      document.getElementById("star"+this.props.event.id).classList.add("fa-star-o");
      var index = currStorage.indexOf(this.props.event.id);
      if (index > -1) {
          currStorage.splice(index, 1);
      }
    } else {
      document.getElementById("event"+this.props.event.id).classList.add("btn-primary");
      document.getElementById("star"+this.props.event.id).classList.add("fa-star");
      document.getElementById("star"+this.props.event.id).classList.remove("fa-star-o");
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