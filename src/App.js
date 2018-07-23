import React, { Component } from 'react';
import './App.css';
import Daybar from './components/Daybar';
import SettingsBar from './components/SettingsBar';
import { Container } from 'reactstrap';
import { filterProgramToCurrentDate, getParams, getRYItinerary } from './utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faClock, faCircle, faMapMarkerAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faClock, faCircle, faMapMarkerAlt, faToggleOn, faToggleOff);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      home: null,
      itinerary: null,
      filterItinerary: false
    }
    this.setRYProgram = this.setRYProgram.bind(this);
    this.toggleRYFilter = this.toggleRYFilter.bind(this);
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

  render() {
    let bars = null;
    if (this.state.itinerary) {
      let cities = getRYItinerary(this.state.itinerary);
      if (this.state.filterItinerary) {
        cities = filterProgramToCurrentDate(cities);
      }
      bars = cities.map((city, index) => {
        return (
          <Daybar icon="clock" key={city.name} base={this.state.base} tz={city.tz} city={city.name} country={city.country} />
        );
      });
    }

    let current = null;
    if (this.state.home) {
      current = <Daybar icon="map-marker-alt" base={this.state.home.tz} tz={this.state.home.tz} city={this.state.home.name} country={this.state.home.country} />;
    }

    return (
      <div className="my-3">
        <Container>
          <div className="mb-4">
            <SettingsBar
              {...this.state}
              setRYProgram={this.setRYProgram}
              toggleRYFilter={this.toggleRYFilter}
            />
          </div>
          {current}
          {bars}
        </Container>
      </div>
    );
  }
}

export default App;
