import React from 'react';
import { Row, Col } from 'reactstrap';
import Datetime from 'react-datetime';
import ToggleRY from './ToggleRY';
import SelectCity from './SelectCity';

class SettingsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // This binding is necessary to make `this` work in the callback
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(selected) {
  }

  render() {
    const icon = this.state.enabled ? 'toggle-on' : 'toggle-off';
    return (
      <Row className="align-items-center">
        <Col xs="auto">
          <SelectCity
            addCity={this.props.addCity}
          />
        </Col>
        <Col xs="auto">
          <ToggleRY
            filterItinerary={this.props.filterItinerary}
            setRYProgram={this.props.setRYProgram}
            toggleRYFilter={this.props.toggleRYFilter}
          />
        </Col>
        <Col className="text-right">
          <Datetime
            value={this.props.date}
            inputProps={{ class: 'form-control w-auto d-inline', size: 10}}
            onChange={this.handleDateChange}
            timeFormat={false}
            closeOnSelect={true}
          />
        </Col>
      </Row>
    );
  }
}

export default SettingsBar;
