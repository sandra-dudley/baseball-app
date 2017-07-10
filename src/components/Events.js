import React, { Component } from 'react';
import Event from './Event';
import moment from 'moment';
import SimpleMap from './SimpleMap';


var axios = require('axios');

class Events extends Component {
  constructor(props) {
      super(props);

      const seatgeek = 'https://api.seatgeek.com/2/events?per_page=24&taxonomies.name=mlb&client_id='+process.env.REACT_APP_SEATGEEK_CLIENT_ID+'&client_secret='+process.env.REACT_APP_SEATGEEK_CLIENT_SECRET;
      this.state = {
        allEvents:'Loading...',
        seatgeek: seatgeek,
        page: 1,
      }      
      this.initialise = this.initialise.bind(this);
      this.renderMap = this.renderMap.bind(this);

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
          this.props.setPage(1);
          this.initialise(nextProps.fromDate, nextProps.toDate);   
          
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      console.log("time", this.props.fromDate, this.props.toDate)
      this.initialise(this.props.fromDate, this.props.toDate); 
      console.log("page changed: ", this.props.page)
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
        'datetime_utc.gte': moment(fDate).format('YYYY-MM-DDT00:00:00'),
        'datetime_utc.lte': moment(tDate).format('YYYY-MM-DDT23:59:59'),
        'page': this.props.page
      }
    })
    .then(function (response) {
      this.setState({allEvents:response.data.events});
      this.props.handleTotalEvents(response.data.meta.total);
      console.log("calling API", this.props.page);
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  renderMap () {
    console.log("rendering map")
    const style = {
      width: '100%',
      height: '400px',
    }
    return(
      <div style={style} >
          <SimpleMap allEvents={this.state.allEvents}/>
        </div>
      )
  }
  
  renderListing() {
    console.log("rendering listing")
    return(
      <div className="d-flex flex-wrap justify-content-center" style={{paddingLeft:0,marginBottom:0}}>
        {
      Array.from(this.state.allEvents).map((event, index) => {
             return (
              <Event event={event} date={moment(event.datetime_local).format('DD MMMM YYYY')} key={index} />
              )
          })
        }
      </div>
        )
  }
  render () {
    
    if(!this.state.allEvents[0]) {
      return <h1  className="event-header">Sorry no result...</h1>;
    }
    return (

      <div>
        { (this.props.mapView) ? this.renderMap() : this.renderListing() }
        
      </div>
    )
  }
}

export default Events