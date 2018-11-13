import React from "react";
import dateFns from "date-fns";
import { Query } from "react-apollo";
import format from "../../_lib/format";
import isAfter from "date-fns/is_after";
import CalendarHeader from './CalendarHeader'
import PriceField from './PriceField'
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";

import { CALENDAR_QUERY } from "../../_lib/queries";

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.bookingStart = this.bookingStart.bind(this);
  }

  state = {
    currentMonth: new Date(),
    selectedDate: '',
    numberOfMonths: this.props.numberOfMonths,
    house: this.props.house,
    arrivalDate: '',
    departureDate: '',
    startBooking: false
  };

  renderHeader(month) {
    const dateFormat = "MMMM YYYY";

    return <div className="header row flex-middle">
        <div className="col col-center" style={{ textAlign: "center" }}>
          <span>{format(month, dateFormat)}</span>
        </div>
      </div>;
  }

  renderDays() {
    const dateFormat = "ddd";
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
    const { selectedDate, departureDate, house } = this.state;
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    let dayz = availabilities;

    while (day <= endDate) {
    // for (let daz of dayz) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        let date = dateFns.format(day, "YYYY-MM-DD");
        let daz = dayz.find(x => x.date === date);
        const cloneDay = daz;
        const minimum = differenceInCalendarDays(daz.date, selectedDate) >= daz.min_nights;
        const maximum = differenceInCalendarDays(daz.date, selectedDate) <= house.max_nights;

        const highlight = daz.departure && isAfter(daz.date, selectedDate) ? (minimum ? (maximum ? "departure" : "") : "") : "";

        days.push(<div className={`col cell
        ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) || dateFns.isSameDay(day, departureDate.date) ? "selected" : ""}
              ${dateFns.isAfter(day, selectedDate) && dateFns.isBefore(day, departureDate.date)? 'selected' : ''}
              ${daz.arrival ? "arrival" : ""}
              ${highlight}
              ${daz.max_nights === 0 ? "booked" : ""}`} key={day} date={daz.date} onClick={() => this.onDateClick(cloneDay)}>
            <span className="bg">
              {!dateFns.isSameMonth(day, monthStart)
                ? ""
                : formattedDate}

            </span>
          </div>);
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
    let template = []
    for (let i = 0; i < this.state.numberOfMonths; i++) {
      template.push(this.renderSingleMonth(i))
    }
    return template
  }

  renderSingleMonth(count) {
    let month = dateFns.addMonths(this.state.currentMonth, count);
    let monthStart = dateFns.startOfMonth(month);
    let monthEnd = dateFns.endOfMonth(month);
    const variables = { id: this.props.portalCode, house_id: this.props.objectCode, starts_at: dateFns.startOfWeek(monthStart), ends_at: dateFns.endOfWeek(monthEnd) };

    return <div className="calendar" key={month}>
        {this.renderHeader(month)}
        {this.renderDays()}
        <Query query={CALENDAR_QUERY} variables={variables}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            const results = data.PortalSite.houses[0].availabilities;

            return this.renderCells(results, month);
          }}
        </Query>
      </div>;
  }

  onDateClick = day => {
    if (day.departure && isAfter(day.date, this.state.selectedDate)) {
      this.setState({
        departureDate: day,
        startBooking: true
      })
    } else if (day.arrival) {
      this.setState({
        startBooking: false,
        selectedDate: dateFns.parse(day.date),
        arrivalDate: day,
        departureDate: ''
        });
      }
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  showBooking() {
    const { startBooking, arrivalDate, departureDate } = this.state;
    const { portalCode, objectCode, locale } = this.props;

    if (startBooking) {
      setTimeout(function () {
        document
        .querySelector(".price-overview")
        .scrollIntoView({
          behavior: "smooth"
        });
      }, 500);
      return <PriceField portalCode={portalCode} objectCode={objectCode} locale={locale} startsAt={arrivalDate.date} endsAt={departureDate.date} onStartBooking={this.bookingStart} />;
    } else {
      return <div></div>
    }
  }

  bookingStart(status) {
    const { arrivalDate, departureDate } = this.state;
    const { portalCode, objectCode } = this.props;
    const booking = {
      portalCode,
      objectCode,
      arrivalDate,
      departureDate,
      is_option: status
    }
    this.props.onBooking(booking)
  }

  render() {
    const { startBooking } = this.state;
    return <div>
        <CalendarHeader onGoNext={this.nextMonth} onGoPrev={this.prevMonth} />
        <div className="calendars-row">{this.renderMonths()}</div>
        <div className={`price-overview ${startBooking ? 'open' : ''}`}>{this.showBooking()}</div>
      </div>;
  }
}

Calendar.defaultProps = {
  numberOfMonths: 4
}

export default Calendar;
