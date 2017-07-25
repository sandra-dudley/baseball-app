import React, { Component } from 'react';
import Countdown from './Countdown';


var axios = require('axios');

class CountdownSettings extends Component {
  constructor(props) {
      super(props);
      const seatgeek = 'https://api.seatgeek.com/2/events?per_page=24&taxonomies.name=mlb&client_id='+process.env.REACT_APP_SEATGEEK_CLIENT_ID+'&client_secret='+process.env.REACT_APP_SEATGEEK_CLIENT_SECRET;
      this.state = {
        allEvents:'Loading...',
        seatgeek: seatgeek,
        hasLoaded: false
      }      
      this.initialise = this.initialise.bind(this);
  }
  componentDidMount() {
    this.initialise();
  }
  

  initialise () {
    /*
    * Connects to api
    */
    var currStorage = JSON.parse(localStorage.getItem('baseballApp'));
    if (currStorage === null) return;
    let favParams = {
      'id': currStorage.join(','),
    }
    var instance = axios.create({
      baseURL: this.state.seatgeek
    });
    instance.get('',{
      params: favParams
    })
    .then(function (response) {
      this.setState({
        allEvents: response.data.events, 
        eventDate: response.data.events[0].datetime_utc,
      });
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render () {
    let card = null;
    if (this.state.hasLoaded) {
      card = "hello"
    } else {
      card = ''
    }

    return (
      <div className="card mb-5">
        <div className="card-block">
          <h4>Your next event {card}</h4>
          <h5>{ this.state.allEvents[0].title }</h5>
          <h5><Countdown dateTo = {this.state.eventDate } /></h5>
        </div>
      </div>
    )
  }
}

export default CountdownSettings