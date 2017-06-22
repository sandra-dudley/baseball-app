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
    return <DatePicker
        selected={this.props.startDate}
        onChange={this.props.handleChange}
    />;
  }
}

export default ChooseDate;