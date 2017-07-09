import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './ChooseDate.css';
import logo from '../assets/baseball-calendar.png';

import 'react-datepicker/dist/react-datepicker.css';
 
// CSS Modules, react-datepicker-cssmodules.css 
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'; 
 
class ChooseDate extends Component {
  constructor (props) {
    super(props)
    this.state = {
    };
  }

 
  render() {
    return (
      <div className="calendar-section row">
      <div className="col-md-2">
      <img src={logo} alt="Logo" width="100" height="100"/>
      </div><div className="col-md-8">
    <h2>Find a baseball game</h2>
    
    {
      (this.props.totalEvents === 0) ? "Find a baseball game between" : "Found "+this.props.totalEvents+" games between"
    }
    <DatePicker
        todayButton={"Today"}
        selected={this.props.startDate}
        selectsStart
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        onChange={this.props.handleChange}
        minDate={moment()}
        className="from dateField"
        dateFormat="ddd, MMM D, YYYY"
    />
    and
    <DatePicker
        selected={this.props.endDate}
        selectsEnd
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        onChange={this.props.handleChangeEnd}
        minDate={this.props.startDate}
        className="dateField"
        dateFormat="ddd, MMM D, YYYY"
    />
    </div>
    <div className="col-md-2">Share</div>
    </div>
    );
  }
}

export default ChooseDate;