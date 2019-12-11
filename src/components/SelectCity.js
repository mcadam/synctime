import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import { searchCities } from '../utils';

class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      isLoading: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(query) {
    this.setState({isLoading: true});
    const options = searchCities(query)
    this.setState({
      isLoading: false,
      options,
    });
  }

  handleChange(city) {
    this.props.addCity(city[0]);
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        id="search-city"
        align="left"
        labelKey={option => `${option.name}, ${option.country}`}
        inputProps={{ size: 30}}
        minLength={2}
        placeholder="Add a city"
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        ref={(ref) => this.typeahead = ref}
      />
    );
  }
}

export default SelectCity;
