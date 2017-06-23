import React, { Component } from 'react';
import Events from './components/Events';
import ChooseDate from './components/ChooseDate';
import moment from 'moment';

import logo from './assets/baseball-calendar.jpg';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    /*
    ** startDate: from when the user wants to search baseball events from
    ** This function is called from child component ChooseDate
    */
    this.setState({
      startDate: date
    });
    console.log('changed date from App');
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div><img src={logo} alt="Logo" /></div>
        <ChooseDate startDate = {this.state.startDate} handleChange={this.handleChange}/>
        <Events fromDate={moment(this.state.startDate).format('YYYY-MM-DD')} toDate={moment(this.state.startDate).add(7, 'days').format('YYYY-MM-DD')}/>
      </div>
    );
  }
}

export default App;
