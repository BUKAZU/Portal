import React, { Component } from 'react';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
      this.prevMonth = this.prevMonth.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
  }

  prevMonth() {
      this.props.prevMonth();
  }

    nextMonth() {
        this.props.nextMonth();
  }

  render() {
    return (
      <div className="header row flex-middle">
        <div className="col col-start" style={{ textAlign: "center" }}>
          <div className="icon" onClick={this.prevMonth}>
            terug
          </div>
        </div>
        <div className="col col-center" style={{ textAlign: "center" }}>
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div
          className="col col-end"
          onClick={this.nextMonth}
          style={{ textAlign: "center" }}
        >
          <div className="icon">volgende</div>
        </div>
      </div>
    );
  }
}

export default CalendarHeader;
