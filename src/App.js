import React, { Component } from 'react';
import Events from './components/Events';
import ChooseDate from './components/ChooseDate';
import moment from 'moment';

import logo from './assets/baseball-calendar.png';
import stadium from './assets/stadium.jpg';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(3,"days")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
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

  handleChangeEnd(date) {
    /*
    ** endDate: when the user wants to search baseball events to
    ** This function is called from child component ChooseDate
    */
    this.setState({
      endDate: date,
      page: 1
    });
    console.log('changed date from App');
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
      <div className="container-fluid" style={divStyle}>
        <div><img src={logo} alt="Logo" width="300" height="300"/></div>
        <ChooseDate 
          startDate = {this.state.startDate} 
          handleChange = {this.handleChange}
          endDate = {this.state.endDate} 
          handleChangeEnd = {this.handleChangeEnd}
        />
        <Events 
          fromDate={moment(this.state.startDate).format('YYYY-MM-DD')} 
          toDate={moment(this.state.endDate).format('YYYY-MM-DD')}
        />
      </div>
    );
  }
}

export default App;
