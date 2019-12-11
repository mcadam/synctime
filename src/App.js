import React, { Component } from 'react';
import './App.css';
import Daybar from './components/Daybar';
import SettingsBar from './components/SettingsBar';
import { Container } from 'reactstrap';
import { filterProgramToCurrentDate, getParams, getRYItinerary } from './utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faCog, faCalendar, faHome, faClock, faCircle, faGlobe, faMapMarkerAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle, faCog, faCalendar, faHome, faClock, faCircle, faGlobe, faMapMarkerAlt, faToggleOn, faToggleOff);

const saveLocally = (key, value) => {
  if (value instanceof Set) {
    value = [...value];
  }
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocally = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      home: getLocally('home') || null,
      cities: new Set(getLocally('cities')) || new Set(),
      itinerary: null,
      filterItinerary: false
    }
    this.setRYProgram = this.setRYProgram.bind(this);
    this.toggleRYFilter = this.toggleRYFilter.bind(this);
    this.addCity = this.addCity.bind(this);
    this.removeCity = this.removeCity.bind(this);
    this.makeHome = this.makeHome.bind(this);
  }

  componentDidMount() {
    getParams().then(state => {
      if (this.state.home) {
        state.home = this.state.home;
      }
      this.setState(state);
    });
  }

  setRYProgram(itinerary) {
    this.setState({ itinerary });
  }

  toggleRYFilter() {
    this.setState(prevState => ({
      filterItinerary: !prevState.filterItinerary
    }));
  }

  addCity(city) {
    let cities = this.state.cities;
    cities.add(city);
    this.setState(prevState => ({
      cities: cities
    }));
    saveLocally('cities', cities);
  }

  removeCity(city) {
    let cities = this.state.cities;
    cities.delete(city);
    this.setState(prevState => ({
      home: prevState.home !== city ? prevState.home : null,
      cities: cities,
    }));
    saveLocally('home', this.state.home !== city ? this.state.home : null);
    saveLocally('cities', cities);
  }

  makeHome(city) {
    let cities = this.state.cities;
    cities.delete(city);
    if (this.state.home) {
      cities.add(this.state.home);
    }
    this.setState(prevState => ({
      home: city,
      cities: cities,
    }));
    saveLocally('home', city);
    saveLocally('cities', cities);
  }

  render() {
    let cities = this.state.cities;
    let home = null;

    if (this.state.home) {
      home = (
        <Daybar icon="map-marker-alt" key={this.state.home.name} base={this.state.home} city={this.state.home} removeCity={this.removeCity} makeHome={this.makeHome} />
      );
    }

    const bars = [...cities].map(city => {
      return (
        <Daybar icon="clock" key={city.name} base={this.state.home} city={city} removeCity={this.removeCity} makeHome={this.makeHome} />
      );
    });

    return (
      <div className="my-3">
        <Container>
          <div className="mb-4">
            <SettingsBar
              {...this.state}
              setRYProgram={this.setRYProgram}
              toggleRYFilter={this.toggleRYFilter}
              addCity={this.addCity}
            />
          </div>
          {home}
          {bars}
        </Container>
      </div>
    );
  }
}

export default App;
