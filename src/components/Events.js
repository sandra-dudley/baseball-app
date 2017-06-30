import React, { Component } from 'react';
import Event from './Event';
import moment from 'moment';
var axios = require('axios');


class Events extends Component {
  constructor(props) {
      super(props);

      const seatgeek = 'https://api.seatgeek.com/2/events?taxonomies.name=baseball&client_id='+process.env.REACT_APP_SEATGEEK_CLIENT_ID+'&client_secret='+process.env.REACT_APP_SEATGEEK_CLIENT_SECRET
      
      this.state = {
        allEvents:'Loading...',
        seatgeek: seatgeek,
      }      
      this.initialise = this.initialise.bind(this);
    
  }
  componentDidMount() {
    /*
    * Gets fromDate from parent component
    * and saves it as its own state variable
    */
    this.initialise(this.props.fromDate);
  }
  componentWillReceiveProps(nextProps) {
    /*
    * Runs anytime the props change data
    */
    if (nextProps.fromDate !== this.props.fromDate 
        || nextProps.toDate !== this.props.fromDate) {
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
      this.setState({allEvents:response.data.events});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render () {
    if(!this.state.allEvents[0]) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>Events </h1>
        <ul style={{marginBottom:0}}>
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