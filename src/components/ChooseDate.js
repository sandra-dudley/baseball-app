import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
 
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
      <div className="calendar-section">
    <h2>Choose a date </h2>
    <DatePicker
        selected={this.props.startDate}
        onChange={this.props.handleChange}
    />
    </div>
    );
  }
}

export default ChooseDate;