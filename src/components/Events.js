import React, { Component } from 'react';
import Event from './Event';
import moment from 'moment';
import styles from './Events.css';
var axios = require('axios');


class Events extends Component {
  constructor(props) {
      super(props);

      const seatgeek = 'https://api.seatgeek.com/2/events?per_page=24&taxonomies.name=mlb&client_id='+process.env.REACT_APP_SEATGEEK_CLIENT_ID+'&client_secret='+process.env.REACT_APP_SEATGEEK_CLIENT_SECRET;
      this.state = {
        allEvents:'Loading...',
        seatgeek: seatgeek,
        totalEvents:0,
      }      
      this.initialise = this.initialise.bind(this);
    
  }
  componentDidMount() {
    /*
    * Gets fromDate from parent component
    * and saves it as its own state variable
    */
    this.initialise(this.props.fromDate,this.props.toDate);
  }
  componentWillReceiveProps(nextProps) {
    /*
    * Runs anytime the props change data
    */

    if (nextProps.fromDate !== this.props.fromDate 
        || nextProps.toDate !== this.props.toDate) {
      this.initialise(nextProps.fromDate, nextProps.toDate);   
    }
  }

  initialise (fDate, tDate) {
    /*
    * Connects to api
    */
    var instance = axios.create({
      baseURL: this.state.seatgeek
    });
    instance.get('',{
      params: {
        'datetime_utc.gte': fDate,
        'datetime_utc.lte': tDate
      }
    })
    .then(function (response) {

      console.log(response);
      this.setState({allEvents:response.data.events, totalEvents: response.data.meta.total});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render () {

    if(!this.state.allEvents[0]) {
      return <h1  className="event-header">Sorry no result...</h1>;
    }
    return (

      <div>
        <h1 className="event-header">Found {this.state.totalEvents} events </h1>
        <div style={{color: '#fff'}}>Between {moment(this.props.fromDate).format('ddd, MMM D, YYYY')} and {moment(this.props.toDate).format('ddd, MMM D, YYYY') }</div>

        <ul className="d-flex flex-wrap justify-content-center" style={{paddingLeft:0,marginBottom:0}}>
          {
        Array.from(this.state.allEvents).map((event, index) => {
               return (
                <Event event={event} date={moment(event.datetime_local).format('DD MMMM YYYY')} key={index} />
                )

            })


        }
        </ul>
      </div>
    )
  }
}

export default Events;