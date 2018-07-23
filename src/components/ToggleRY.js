import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import { getRYItineraries } from '../utils';

class ToggleRY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      modal: false,
      selected: null
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    this.setState(prevState => ({
      enabled: !prevState.enabled
    }));
    if (this.state.enabled) {
      this.props.setRYProgram(null);
      this.setState({ selected: null });
    }
  }

  handleChange(selected) {
    this.setState({ selected });
    this.props.setRYProgram(selected[0]);
  }

  handleFilter(selected) {
    this.props.toggleRYFilter();
  }

  render() {
    const icon = this.state.enabled ? 'toggle-on' : 'toggle-off';
    const filterIcon = this.props.filterItinerary ? 'toggle-on' : 'toggle-off';
    const classes = this.state.enabled ? 'mr-1 text-success' : 'mr-1';
    const filterClasses = this.props.filterItinerary ? 'mr-1 text-success' : 'mr-1';

    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>
          <FontAwesomeIcon className="mr-2" size="lg" icon="globe" />
          RY
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Remote Year</ModalHeader>
          <ModalBody>
            <div className="cursor-pointer mb-3" onClick={this.handleClick}>
              <FontAwesomeIcon className={classes} size="lg" icon={icon} />
              <strong>Remote Year</strong>
            </div>
            {this.state.enabled &&
              <Typeahead
                placeholder="Select an itinerary..."
                selected={this.state.selected}
                onChange={this.handleChange}
                options={getRYItineraries()}
              />
            }
            {this.state.enabled &&
              <div className="cursor-pointer my-3" onClick={this.handleFilter}>
                <FontAwesomeIcon className={filterClasses} size="lg" icon={filterIcon} />
                <strong>Only display active month</strong>
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ToggleRY;
