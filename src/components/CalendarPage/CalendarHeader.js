import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
    this.resetDate = this.resetDate.bind(this);
  }

  goPrev() {
    this.props.onGoPrev();
  }

  resetDate() {
    this.props.onReset();
  }

  goNext() {
    this.props.onGoNext();
  }

  render() {
    return <div className="calendars-header">
        <div className="col" style={{ textAlign: "center" }} onClick={this.goPrev}>
        <div className="icon"> <FormattedMessage id="previous" /></div>
        </div>
        <div className="col" onClick={this.resetDate} style={{ textAlign: "center" }}>
          <div className="icon">
            <FormattedMessage id="reset" />
          </div>
        </div>
        <div className="col" onClick={this.goNext} style={{ textAlign: "center" }}>
          <div className="icon">
            <FormattedMessage id="next" />
          </div>
        </div>
      </div>;
  }
}

export default CalendarHeader;
