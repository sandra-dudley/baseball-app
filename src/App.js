import React, { Component } from 'react';
import Events from './components/Events';
import ChooseDate from './components/ChooseDate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChooseDate />
        <Events />
      </div>
    );
  }
}

export default App;
