import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Query } from 'react-apollo';
import Loading from '../icons/loading.svg';
import format from '../../_lib/format';
import isAfter from 'date-fns/is_after';
import CalendarHeader from './CalendarHeader';
import PriceField from './PriceField';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import { CALENDAR_QUERY } from '../../_lib/queries';
import { FormattedMessage } from 'react-intl';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.bookingStart = this.bookingStart.bind(this);
  }

  state = {
    currentMonth: new Date(),
    selectedDate: '',
    numberOfMonths: this.props.numberOfMonths,
    house: this.props.house,
    arrivalDate: '',
    departureDate: '',
    startBooking: false,
  };

  renderHeader(month) {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className="header row flex-middle">
        <div className="col col-center" style={{ textAlign: 'center' }}>
          <span>{format(month, dateFormat)}</span>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'ddd';
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells(availabilities, month) {
    const { selectedDate, departureDate, house, arrivalDate } = this.state;
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const today = new Date();

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';
    let dayz = availabilities;
    let prevBooked = false;

    while (day <= endDate) {
      // for (let daz of dayz) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        let date = dateFns.format(day, 'YYYY-MM-DD');
        let daz = dayz.find(x => x.date === date);

        const cloneDay = daz;
        const minimum =
          differenceInCalendarDays(daz.date, selectedDate) >= daz.min_nights;
        const maximum =
          differenceInCalendarDays(daz.date, selectedDate) <=
            house.max_nights &&
          differenceInCalendarDays(daz.date, selectedDate) <=
            arrivalDate.max_nights;
        // console.log({ date: daz.date, daz, maximum });

        const daysFromToday = differenceInCalendarDays(daz.date, today);
        const last_minute =
          daysFromToday <= house.last_minute_days && daysFromToday >= 0;

        const highlight =
          daz.departure && isAfter(daz.date, selectedDate)
            ? minimum
              ? maximum
                ? !prevBooked
                  ? 'departure'
                  : null
                : ''
              : ''
            : '';

        days.push(
          <div
            className={`col cell
        ${
          !dateFns.isSameMonth(day, monthStart)
            ? 'disabled'
            : dateFns.isSameDay(day, selectedDate) ||
              dateFns.isSameDay(day, departureDate.date)
            ? 'selected'
            : ''
        }
              ${
                dateFns.isAfter(day, selectedDate) &&
                dateFns.isBefore(day, departureDate.date)
                  ? 'selected'
                  : ''
              }
              ${last_minute || daz.special_offer > 0 ? 'discount' : ''}
              ${
                daz.arrival
                  ? dateFns.isAfter(daz.date, new Date())
                    ? daz.max_nights !== 0
                      ? prevBooked
                        ? 'departure-arrival'
                        : 'arrival'
                      : ''
                    : ''
                  : ''
              }
              ${highlight}
              ${
                daz.max_nights === 0
                  ? !prevBooked
                    ? 'booked-departure'
                    : 'booked'
                  : ''
              }`}
            key={day}
            date={daz.date}
            role="button"
            tabIndex={0}
            onClick={() => this.onDateClick(cloneDay)}
            onKeyPress={() => this.onDateClick(cloneDay)}
          >
            <span>
              {!dateFns.isSameMonth(day, monthStart) ? '' : formattedDate}
            </span>
          </div>
        );
        prevBooked = daz.max_nights === 0 ? true : false;
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  renderMonths() {
    let template = [];
    for (let i = 0; i < this.state.numberOfMonths; i++) {
      template.push(this.renderSingleMonth(i));
    }
    return template;
  }

  renderSingleMonth(count) {
    let month = dateFns.addMonths(this.state.currentMonth, count);
    let monthStart = dateFns.startOfMonth(month);
    let monthEnd = dateFns.endOfMonth(month);
    const variables = {
      id: this.props.portalCode,
      house_id: this.props.objectCode,
      starts_at: dateFns.startOfWeek(monthStart),
      ends_at: dateFns.endOfWeek(monthEnd),
      locale: this.props.locale,
    };

    return (
      <div className="calendar" key={month}>
        {this.renderHeader(month)}
        {this.renderDays()}
        <Query query={CALENDAR_QUERY} variables={variables}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div>
                  <Loading />
                </div>
              );
            if (error) return <div>Error</div>;

            const results = data.PortalSite.houses[0].availabilities;

            return this.renderCells(results, month);
          }}
        </Query>
      </div>
    );
  }

  onDateClick = day => {
    const { arrivalDate, selectedDate, house } = this.state;
    if (
      day.departure &&
      isAfter(day.date, selectedDate) &&
      differenceInCalendarDays(day.date, selectedDate) <= house.max_nights &&
      differenceInCalendarDays(day.date, selectedDate) <= arrivalDate.max_nights
    ) {
      this.setState({
        departureDate: day,
        startBooking: true,
      });
    } else if (day.arrival) {
      this.setState({
        startBooking: false,
        selectedDate: dateFns.parse(day.date),
        arrivalDate: day,
        departureDate: '',
      });
    }
  };

  nextMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, numberOfMonths),
    });
  };

  prevMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, numberOfMonths),
    });
  };

  reset = () => {
    this.setState({
      selectedDate: '',
      arrivalDate: '',
      departureDate: '',
    });
  };

  showBooking() {
    const { startBooking, arrivalDate, departureDate } = this.state;
    const { portalCode, objectCode, locale } = this.props;

    if (startBooking) {
      setTimeout(function() {
        document.querySelector('.price-overview').scrollIntoView({
          behavior: 'smooth',
        });
      }, 1000);
      return (
        <PriceField
          portalCode={portalCode}
          objectCode={objectCode}
          locale={locale}
          startsAt={arrivalDate.date}
          endsAt={departureDate.date}
          onStartBooking={this.bookingStart}
        />
      );
    } else {
      return <div />;
    }
  }

  bookingStart(status) {
    const { arrivalDate, departureDate } = this.state;
    const { portalCode, objectCode, locale } = this.props;
    const booking = {
      portalCode,
      objectCode,
      arrivalDate,
      departureDate,
      is_option: status,
      locale,
    };
    this.props.onBooking(booking);
  }

  render() {
    const { startBooking } = this.state;
    return (
      <div>
        <CalendarHeader
          onGoNext={this.nextMonth}
          onGoPrev={this.prevMonth}
          onReset={this.reset}
        />
        <div className="calendars-row">{this.renderMonths()}</div>
        <div className="legend">
          <div>
            <span className="legend-field arrival" />
            <FormattedMessage id="arrival_date" />
          </div>
          <div>
            <span className="legend-field booked" />
            <FormattedMessage id="booked" />
          </div>
          <div>
            <span className="legend-field departure" />
            <FormattedMessage id="departure_date" />
          </div>
          <div>
            <span className="legend-field last_minute_discount" />
            <FormattedMessage id="last_minute_discount" />
          </div>
        </div>
        <div className={`price-overview ${startBooking ? 'open' : ''}`}>
          {this.showBooking()}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  numberOfMonths: 4,
};

Calendar.propTypes = {
  numberOfMonths: PropTypes.number,
  house: PropTypes.object.isRequired,
  onBooking: PropTypes.func.isRequired,
  objectCode: PropTypes.string.isRequired,
  portalCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Calendar;
