import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import { getRYItineraries } from '../utils';

class SelectCity extends React.Component {
  render() {
    return (
      <Button>select a city</Button>
    );
  }
}

export default SelectCity;
