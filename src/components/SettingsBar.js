import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Datetime from 'react-datetime';
import ToggleRY from './ToggleRY';
import SelectCity from './SelectCity';

class SettingsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDate: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleDate = this.toggleDate.bind(this);
  }

  handleDateChange(selected) {
  }

  toggleDate() {
    this.setState(prevState => ({
      openDate: !prevState.openDate
    }));
  }

  renderInput( props, openCalendar, closeCalendar ) {
    return (
        <Button outline color="secondary" onClick={openCalendar}>
          <FontAwesomeIcon className="mr-2" size="lg" icon="calendar" />
          {props.value}
        </Button>
    );
  }

  render() {
    return (
      <Row className="align-items-center">
        <Col xs="auto" className="pr-1">
          <SelectCity
            addCity={this.props.addCity}
          />
        </Col>
        <Col xs="auto" className="px-1">
          <ToggleRY
            filterItinerary={this.props.filterItinerary}
            setRYProgram={this.props.setRYProgram}
            toggleRYFilter={this.props.toggleRYFilter}
          />
        </Col>
      </Row>
    );
  }
}

export default SettingsBar;
