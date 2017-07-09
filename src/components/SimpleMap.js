//https://github.com/fullstackreact/google-maps-react

import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import Marker from './Marker';


class SimpleMap extends Component {
  constructor(props) {
    super(props);
  this.fetchPlaces = this.fetchPlaces.bind(this)
    }
    
  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
  }
  
  
  render() {

    return ( 
      <Map google={this.props.google} onReady={this.fetchPlaces} containerStyle={{height: '400px'}}>
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
      
        <InfoWindow onClose={this.onInfoWindowClose} visible={true}>
            <div>
              <h1>Current location</h1>
            </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP
})(SimpleMap)