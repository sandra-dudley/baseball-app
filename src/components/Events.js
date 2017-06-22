import React, { Component } from 'react';
import Event from './Event';

var axios = require('axios');


class Events extends Component {
  constructor(props) {
      super(props);

      const seatgeek = 'https://api.seatgeek.com/2/events?taxonomies.name=baseball&client_id='+process.env.REACT_APP_SEATGEEK_CLIENT_ID+'&client_secret='+process.env.REACT_APP_SEATGEEK_CLIENT_SECRET
      
      this.state = {
        allEvents:'Loading...',
        seatgeek: seatgeek
      }      
      this.initialise = this.initialise.bind(this);
  }
  componentDidMount() {
    this.initialise();
  }
  
  initialise () {
    var instance = axios.create({
      baseURL: this.state.seatgeek
    });
    instance.get('',{
      params: {
        'datetime_utc.gte': '2017-06-22',
        'datetime_utc.lte': '2017-06-29'
      }
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log(response.data.events);
      this.setState({allEvents:Array.from(response.data.events)})
      
      
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render () {

    return(
      <div>
        Events: 
        <ul>
          {Array.from(this.state.allEvents).map((event, index) => {
              return (
              <li><Event short_title={event.short_title} key={index} /></li>
              )
            })
          }
        </ul>
      </div>
      )
  }
}

export default Events;