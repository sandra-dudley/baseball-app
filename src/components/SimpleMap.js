//https://github.com/fullstackreact/google-maps-react

import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import Marker from './Marker';


class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  this.fetchPlaces = this.fetchPlaces.bind(this);
  this.onMarkerClick = this.onMarkerClick.bind(this);
  this.onMapClicked = this.onMapClicked.bind(this);
  this.renderMarker = this.renderMarker.bind(this);
    }
    
  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log("click")
  }
  
  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  
  renderMarker() {
    var listing = [];
    console.log("center", this.props.mapCenter)
    if (this.props.google && this.props.allEvents && typeof this.props.allEvents === "object") {
    Array.from(this.props.allEvents).map((event,index) => {
      console.log(event, event.title, event.venue.location.lon, event.venue.location.lat);
      listing.push(
        <Marker 
          name={event.title}
          position={{lat: event.venue.location.lat, lng: event.venue.location.lon}} 
          onClick={this.onMarkerClick}
          key = {index}
        />
        )
    })
    listing.push(<InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          key={this.props.allEvents.length}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>)
    return listing;
    }
  }
  

  

    
  render() {
    
    return ( 
      <div>
      
      <Map 
        google={this.props.google} 
        onReady={this.fetchPlaces} 
        zoom={4}
        initialCenter = {{lat:37.0902,lng:-95.7129}}
        containerStyle={{height: '400px'}} 
        onClick={this.onMapClicked}>
        {
          this.renderMarker()
      }
        
        
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP
})(SimpleMap)