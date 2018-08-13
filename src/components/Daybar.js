import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardGroup } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getColorForHour, isOverlapping, isCurrent, getOffset } from '../utils';

class Daybar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: moment.tz.guess(),
      date: moment(),
      dropdownOpen: false
    };
    this.toggleOptions = this.toggleOptions.bind(this);
    this.removeCity = this.removeCity.bind(this);
    this.makeHome = this.makeHome.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleOptions() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  removeCity() {
    this.props.removeCity(this.props.city);
  }

  makeHome() {
    this.props.makeHome(this.props.city);
  }

  render() {
    let overlapHours = [];
    const base = this.props.base ? this.props.base.tz : this.state.base;
    const date = this.props.date || this.state.date;

    const hours = Array(24).fill(null).map((value, index) => {
      const baseHour = moment(date).tz(base).hour(index);
      const tzHour = baseHour.clone().tz(this.props.city.tz);
      const color = getColorForHour(tzHour);
      const overlap = isOverlapping(tzHour, baseHour);
      const current = isCurrent(baseHour);

      let classes = 'text-monospace';

      if (current) {
        classes = `${classes} shadow-important`;
      }
      if (overlap) {
        overlapHours.push(baseHour.format('ha'));
        classes = `${classes} opacity-100`;
      } else {
        classes = `${classes} opacity-50`;
      }
      if (tzHour.hour() !== 23 && tzHour.hour() !== 0) {
        classes = `${classes} rounded-0`;
      }

      if (tzHour.hour() === 23) {
        classes = `${classes} rounded-right mr-1`;
      }
      if (index < 9 || index > 17) {
        classes = `${classes} d-none d-md-block`;
      }

      if (tzHour.hour() === 0) {
        classes = `${classes} rounded-left`;
        return (
          <Card className={classes} key={index} inverse color="secondary">
            <Moment className="d-block" format="MMM">{tzHour}</Moment>
            <Moment className="d-block small mb-2" format="D" style={{lineHeight: "3px"}}>{tzHour}</Moment>
          </Card>
        );
      }

      return (
        <Card className={classes} key={index} inverse color={color}>
          <Moment className="d-block" format="h">{tzHour}</Moment>
          <Moment className="d-block small mb-2" format="a" style={{lineHeight: "3px"}}>{tzHour}</Moment>
        </Card>
      );
    });

    let overlapHoursText = `No availability ${base}`;
    if (overlapHours.length === 1) {
      overlapHoursText = `Available ${base} ${overlapHours[0]}`;
    } else if (overlapHours.length > 1) {
      overlapHoursText = `Available ${base} ${overlapHours[0]}-${overlapHours.pop()}`;
    }

    const offset = <h5 className="ml-1 m-0">{getOffset(this.props.city.tz, base)}</h5>;

    const statusColor = getColorForHour(moment.tz(this.props.city.tz));

    return (
      <div>
        <div className="d-flex flex-row align-items-center">
          <FontAwesomeIcon icon={this.props.icon} className={`mr-2 text-${statusColor}`} />
          <h5 className="m-0">
            <strong>
              <Moment tz={this.props.city.tz} format="hh:mm"/>
            </strong>
            <small>
              <Moment tz={this.props.city.tz} format="A" className="ml-1 small"/>
            </small>
          </h5>
          {offset}
          <div className="ml-auto">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleOptions}>
              <DropdownToggle tag="span" className="mr-4 p-2 cursor-pointer">
                <FontAwesomeIcon icon="cog" size="xs"  />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  className="align-items-center d-flex"
                  onClick={this.makeHome}
                >
                  <FontAwesomeIcon icon="map-marker-alt" className="mr-2"
                    size="xs"/>
                  Make home
                </DropdownItem>
                <DropdownItem
                  className="text-danger align-items-center d-flex"
                  onClick={this.removeCity}
                >
                  <FontAwesomeIcon icon="times-circle" className="mr-2" size="xs" />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div>
          <strong>{this.props.city.name}</strong>, {this.props.city.country} <span className="d-none d-md-inline-block">({overlapHoursText})</span>
        </div>
        <CardGroup className="flex-row flex-nowrap my-3 text-center">
          {hours}
        </CardGroup>
      </div>
    );
  }
}

export default Daybar;
