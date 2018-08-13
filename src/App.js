import React, { Component } from 'react';
import './App.css';
import Daybar from './components/Daybar';
import SettingsBar from './components/SettingsBar';
import { Container } from 'reactstrap';
import { filterProgramToCurrentDate, getParams, getRYItinerary } from './utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faCog, faCalendar, faHome, faClock, faCircle, faGlobe, faMapMarkerAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle, faCog, faCalendar, faHome, faClock, faCircle, faGlobe, faMapMarkerAlt, faToggleOn, faToggleOff);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      home: null,
      cities: [],
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
    this.setState(prevState => ({
      cities: [...prevState.cities, city]
    }));
  }

  removeCity(city) {
    this.setState(prevState => ({
      home: prevState.home !== city ? prevState.home : null,
      cities: prevState.cities.filter(c => c !== city)
    }));
  }

  makeHome(city) {
    this.setState(prevState => ({
      home: city,
      cities: prevState.cities.filter(c => c !== city)
    }));
  }

  render() {
    let cities = this.state.cities;

    if (this.state.itinerary) {
      let rycities = getRYItinerary(this.state.itinerary);
      if (this.state.filterItinerary) {
        rycities = filterProgramToCurrentDate(cities);
      }
      cities = [...cities, ...rycities];
    }

    let home = null;
    if (this.state.home) {
      home = (
        <Daybar icon="map-marker-alt" key={this.state.home.name} base={this.state.home} city={this.state.home} removeCity={this.removeCity} makeHome={this.makeHome} />
      );
    }


    const bars = cities.map((city, index) => {
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
