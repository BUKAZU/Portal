import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  goPrev() {
    this.props.onGoPrev();
  }

  goNext() {
    this.props.onGoNext();
  }

  render() {
    return <div className="header row flex-middle">
        <div className="col col-start" style={{ textAlign: "center" }} onClick={this.goPrev}>
        <div className="icon"> <FormattedMessage id="previous" /></div>
        </div>
        <div className="col col-center" style={{ textAlign: "center" }}>
          {/* <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span> */}
        </div>
        <div className="col col-end" onClick={this.goNext} style={{ textAlign: "center" }}>
          <div className="icon">
            <FormattedMessage id="next" />
          </div>
        </div>
      </div>;
  }
}

export default CalendarHeader;
