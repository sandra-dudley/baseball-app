import React, { Component } from 'react';

class ToggleViewButton extends Component {
  constructor(props) {
      super(props);
  }
  render () {
    return(
        <div>
          <div className="btn-group toggleView">
            <label className={
              (this.props.mapView) ? "btn btn-primary" : "btn btn-primary active"
            }>
              <input type="radio"value="false" onChange={this.props.mapVisibility} checked={this.props.mapView === false} /> View list
            </label>
            <label className={
              (this.props.mapView) ? "btn btn-primary active" : "btn btn-primary"
            }>
              <input type="radio" value="true" onChange={this.props.mapVisibility} checked={this.props.mapView === true}/> View map
            </label>
          </div>
        </div>
        )
  }
   
}
export default ToggleViewButton