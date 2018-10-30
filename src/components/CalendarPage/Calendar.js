import React from "react";
import dateFns from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// import "./Calendar.css";

export const CALENDAR_QUERY = gql`
  query PortalSiteHousesQuery(
    $id: ID!
    $house_id: ID!
    $starts_at: Date!
    $ends_at: Date!
  ) {
    PortalSite(id: $id) {
      houses(id: $house_id) {
        id
        name
        availabilities(starts_at: $starts_at, ends_at: $ends_at) {
          arrival
          arrival_time_from
          arrival_time_to
          date
          departure
          departure_time
          max_nights
          min_nights
        }
      }
    }
  }
`;

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    numberOfMonths: this.props.numberOfMonths
  };

  renderHeader(month) {
    const dateFormat = "MMMM YYYY";

    return <div className="header row flex-middle">
        <div className="col col-start" style={{ textAlign: "center" }}>
          <div className="icon" onClick={this.prevMonth}>
            terug
          </div>
        </div>
        <div className="col col-center" style={{ textAlign: "center" }}>
          <span>{dateFns.format(month, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth} style={{ textAlign: "center" }}>
          <div className="icon"></div>
        </div>
      </div>;
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells(availabilities, month) {
    const { selectedDate } = this.state;
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
        const cloneDay = day;
        let date = dateFns.format(day, "YYYY-MM-DD");
        let daz = dayz.find(x => x.date === date);
        console.log(daz);

        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
              } ${daz.arrival ? 'arrival' : ''} ${daz.max_nights === 0 ? 'booked' : ''}`}
            key={day}
            date={daz.date}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="bg">
              {!dateFns.isSameMonth(day, monthStart) ? "" : formattedDate}
            </span>
          </div>
        );
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
    console.log(month);
    let monthStart = dateFns.startOfMonth(month);
    let monthEnd = dateFns.endOfMonth(month);
    const variables = {
      id: this.props.portal_code,
      house_id: this.props.objectCode,
      starts_at: dateFns.startOfWeek(monthStart),
      ends_at: dateFns.endOfWeek(monthEnd)
    };

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
    this.setState({
      selectedDate: day
    });
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

  render() {
    return (
      <div className="calendars-row">
        {this.renderMonths()}
      </div>
    );
  }
}

Calendar.defaultProps = {
  numberOfMonths: 4
}

export default Calendar;
