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
        page: 1,
      }      
      this.initialise = this.initialise.bind(this);
      this.pageNumber = this.pageNumber.bind(this);
      this.changePage = this.changePage.bind(this);
    
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
          this.setState({page: 1});
      this.initialise(nextProps.fromDate, nextProps.toDate);   
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.initialise(this.props.fromDate, this.props.toDate); 
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
        'datetime_utc.lte': tDate,
        'page': this.state.page
      }
    })
    .then(function (response) {

      console.log(response);
      this.setState({allEvents:response.data.events, totalEvents: response.data.meta.total});
      this.pageNumber();
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  
  pageNumber () {
    console.log("in page number");
    var totalPages;
    if (this.state.totalEvents > 24) {
      totalPages = Math.round(this.state.totalEvents/24);
      console.log(totalPages);
    }
    var pagination = [];
    for (var i = 0; i < totalPages; i ++) {
      pagination.push(<a href='#' onClick={this.changePage} data-pageNum = {i+1} style={{padding:0.2+'em', background: '#fff', borderRadius: 3+"px", marginRight: 0.5+'em'}}>{i+1}</a>);
    }
    
    return pagination;
  }

  changePage(event) {
    event.preventDefault();
    console.log("I want another page ", event.target.dataset.pagenum);
    this.setState({page: event.target.dataset.pagenum});
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
        {this.pageNumber()}
      </div>
    )
  }
}

export default Events;