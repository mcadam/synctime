import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardGroup, Badge } from 'reactstrap';
import { getColorForHour, isOverlapping, isCurrent, getOffset } from '../utils';

class Daybar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: this.props.base || moment.tz.guess(),
      date: this.props.date || moment()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let overlapHours = [];

    const hours = Array(24).fill(null).map((value, index) => {
      const baseHour = moment(this.state.date).tz(this.state.base).hour(index);
      const tzHour = baseHour.clone().tz(this.props.tz);
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

    let overlapHoursText = `No availability ${this.state.base}`;
    if (overlapHours.length === 1) {
      overlapHoursText = `Available ${this.state.base} ${overlapHours[0]}`;
    } else if (overlapHours.length > 1) {
      overlapHoursText = `Available ${this.state.base} ${overlapHours[0]} - ${overlapHours.pop()}`;
    }

    const offset = <Badge color="secondary" pill>{getOffset(this.props.tz, this.state.base)}</Badge>;

    const statusColor = getColorForHour(moment.tz(this.props.tz));

    return (
      <div>
        <div className="d-flex flex-row align-items-center">
          <FontAwesomeIcon icon={this.props.icon} size="xs" className={`mr-2 text-${statusColor}`} />
          <h5 className="m-0">
            <Moment tz={this.props.tz} format="hh:mm"/>
            <small>
              <Moment tz={this.props.tz} format="A" className="ml-1 small"/>
            </small>
          </h5>
        </div>
        <div className="d-flex flex-row align-items-center">
          <strong>{this.props.city}</strong>, {this.props.country}, {overlapHoursText}
        </div>
        <CardGroup className="flex-row flex-nowrap my-3 text-center">
          {hours}
        </CardGroup>
      </div>
    );
  }
}

export default Daybar;
