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
        allEventsObject: {},
        seatgeek: seatgeek,
        fromDate:''
      }      
      this.initialise = this.initialise.bind(this);
    
  }
  componentDidMount() {
    /*
    * Gets fromDate from parent component
    * and saves it as its own state variable
    */
    this.setState({fromDate: this.props.fromDate})
    this.initialise();
  }
  componentWillReceiveProps(nextProps) {
    /*
    * Runs anytime the props change data
    */
    if (nextProps.fromDate !== this.state.fromDate) {
      this.setState({ fromDate: nextProps.fromDate });
      console.log(nextProps.fromDate );
      this.initialise();
      
    }
  }
  initialise () {
    /*
    * Connects to api
    */
    var instance = axios.create({
      baseURL: this.state.seatgeek
    });
    instance.get('',{
      params: {
        'datetime_utc.gte': this.state.fromDate,
        'datetime_utc.lte': this.props.toDate
      }
    })
    .then(function (response) {
      this.setState({allEvents:Array.from(response.data.events), allEventsObject: response.data.events});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render () {
    
    return(
      <div>
        <h1>Events </h1>
        <ul style={{marginBottom:0}}>
          {
        Array.from(this.state.allEvents).map((event, index) => {
               return (
                <Event event={event} date={moment(event.datetime_utc).format('DD MMMM YYYY')} key={index} />
                )

            })


        }
        </ul>
      </div>
      )
  }
}

export default Events;