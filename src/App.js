import React, { Component } from 'react';
import './App.css';
import Daybar from './components/Daybar';
import { Container } from 'reactstrap';
import { filterProgramToCurrentDate } from './utils';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterProgram: false,
      program: this.props.programs[0],
      base: 'Europe/London'
    };
  }

  handleFilterClick(value) {
    this.setState('filterProgram', value);
  }

  render() {
    let cities = this.state.program.cities;
    if (this.state.filterProgram) {
      cities = filterProgramToCurrentDate(cities);
    }
    const bars = cities.map((city, index) => {
      return (
        <Daybar key={city.name} base={this.state.base} tz={city.tz} city={city.name} country={city.country} program={this.state.program} />
      );
    });

    return (
      <div className="my-3">
        <Container>
          <Daybar base={this.state.base} tz={this.state.base} city="London" country="UK" program={this.state.program} />
          {bars}
        </Container>
      </div>
    );
  }
}

export default App;
