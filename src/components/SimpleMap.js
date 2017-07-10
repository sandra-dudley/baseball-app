//https://github.com/fullstackreact/google-maps-react

import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import Marker from './Marker';
import Event from './Event';
import EventContent from './EventContent';
import moment from 'moment';


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
  this.renderMarkers = this.renderMarkers.bind(this);
    }

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    
  }
  
  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  
  renderMarkers() {
    var listing = [];
    if (this.props.allEvents && typeof this.props.allEvents === "object") {
    Array.from(this.props.allEvents).map((event,index) => {
      listing.push(
        <Marker 
          name={event.title}
          position={{lat: event.venue.location.lat, lng: event.venue.location.lon}} 
          onClick={this.onMarkerClick}
          event = {event}
          key = {index}
        />
        )
    })
    listing.push(<InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          key={this.props.allEvents.length}>
            <div>
              {this.renderInfoWindow()}
            </div>
        </InfoWindow>)
    return listing;
    }
  }
  renderInfoWindow() {
    if (this.state.selectedPlace.event) {
      let markerEvent = <EventContent event={this.state.selectedPlace.event} />
        return markerEvent;
    }
  }

  

    
  render() {
    
    return ( 
      <div style= {{marginTop:"1em"}}>
      
      <Map 
        google={this.props.google} 
        onReady={this.fetchPlaces} 
        zoom={4}
        initialCenter = {{lat:37.0902,lng:-95.7129}}
        containerStyle={{height: '400px'}} 
        onClick={this.onMapClicked}>
        {
          this.renderMarkers()
        }
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP
})(SimpleMap)