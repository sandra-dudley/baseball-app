import React, { Component } from 'react';
import Events from './components/Events';
import ChooseDate from './components/ChooseDate';
import ToggleViewButton from './components/ToggleViewButton';
import moment from 'moment';
import './App.css'
import stadium from './assets/stadium.jpg';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(3,"days"),
      totalEvents: 0,
      page:1,
      mapView: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleTotalEvents = this.handleTotalEvents.bind(this);
    this.mapVisibility = this.mapVisibility.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setPage = this.setPage.bind(this);
  }
 
  handleChange(date) {
    /*
    ** startDate: from when the user wants to search baseball events from
    ** This function is called from child component ChooseDate
    */
    this.setState({
      startDate: date,
      page: 1
    });
    if (date>this.state.endDate) {
      
      this.setState({endDate: moment(date).add(3,"days")});
      this.handleChangeEnd(moment(date).add(3,"days"))
    }
  }
  
  handleChangeEnd(date) {
    /*
    ** endDate: when the user wants to search baseball events to
    ** This function is called from child component ChooseDate
    */
    this.setState({
      endDate: date,
      page: 1
    });
  }
  
  handleTotalEvents (total) {
    this.setState({
      totalEvents: total
    });
    console.log("total events", total);
  }
  
  changePage(event) {
    event.preventDefault();
    this.setState({page: event.target.dataset.pagenum});
  }
  
  setPage(page) {
    this.setState({page: page});
  }

  mapVisibility(event) {
    let setMapView = (event.target.value === "true") ? true : false;
    this.setState({mapView: setMapView});
    console.log("show map button", event.target.value)
  }
  render() {
    const divStyle = {
      backgroundImage: 'url('+stadium+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundColor: '#09140c',
      backgroundAttachment: 'fixed',
      padding: 0,
      minHeight: '100vh'
    };
    const style = {
      width: '800px',
      height: '400px'
    };
    return (
      <div>
      <div className="container-fluid" style={divStyle}>
      <nav className="navbar">
      
        <ChooseDate 
          startDate = {this.state.startDate} 
          handleChange = {this.handleChange}
          endDate = {this.state.endDate} 
          handleChangeEnd = {this.handleChangeEnd}
          totalEvents = {this.state.totalEvents}
        />
        </nav>
        
        <ToggleViewButton mapView={this.state.mapView} mapVisibility={this.mapVisibility}/>
        
        <Events 
          fromDate={moment(this.state.startDate).format('YYYY-MM-DD')} 
          toDate={moment(this.state.endDate).format('YYYY-MM-DD')}
          handleTotalEvents = {this.handleTotalEvents}
          totalEvents = {this.state.totalEvents}
          mapView = {this.state.mapView}
          setPage = {this.setPage}
          changePage = {this.changePage}
          page = {this.state.page}
        />
      </div>
      </div>
    );
  }
}

export default App;
