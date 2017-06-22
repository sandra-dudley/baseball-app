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
        fromDate:''
      }      
      this.initialise = this.initialise.bind(this);
      this.renderEvents = this.renderEvents.bind(this);
    
  }
  componentDidMount() {
    this.setState({fromDate: this.props.fromDate})
    this.initialise();
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.fromTime !== this.state.fromDate) {
      this.setState({ fromTime: nextProps.fromDate });
      console.log(nextProps.fromDate );
      this.initialise();
    }
  }
  initialise () {
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
      this.setState({allEvents:Array.from(response.data.events)})
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  
  renderEvents () {
    let eventsArray = [];
    Array.from(this.state.allEvents).map((event, index) => {
              eventsArray.push(
                <Event short_title={event.short_title} key={index} />
              );
            });
    return  eventsArray;
  }
  render () {
    
    return(
      <div>
        Events from {moment(this.state.fromTime).format('DD MM YY')}: 
        <ul>
          {this.renderEvents()}
        </ul>
      </div>
      )
  }
}

export default Events;