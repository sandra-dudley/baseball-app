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
        totalEvents:0,
        page: 1,
      }      
      this.initialise = this.initialise.bind(this);
      this.pageNumber = this.pageNumber.bind(this);
      this.changePage = this.changePage.bind(this);
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
      this.setState({allEvents:response.data.events, totalEvents: response.data.meta.total});
      this.props.handleTotalEvents(response.data.meta.total);
      this.pageNumber();
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  
  pageNumber () {
    var totalPages;
    if (this.state.totalEvents > 24) {
      totalPages = Math.round(this.state.totalEvents/24);
    }
    var pagination = [];
    for (var i = 0; i < totalPages; i ++) {
      pagination.push(<a href='#' onClick={this.changePage} key = {i+11} data-pageNum = {i+1} style={{padding:0.2+'em', background: '#fff', borderRadius: 3+"px", marginRight: 0.5+'em'}}>{i+1}</a>);
    }
    
    return pagination;
  }

  changePage(event) {
    event.preventDefault();
    this.setState({page: event.target.dataset.pagenum});
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
        { this.pageNumber()}
        { (this.props.mapView) ? this.renderMap() : this.renderListing() }
        
      </div>
    )
  }
}

export default Events