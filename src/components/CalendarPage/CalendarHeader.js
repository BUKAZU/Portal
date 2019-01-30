import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowRight from '../icons/ArrowRight.svg';
import ArrowLeft from '../icons/ArrowLeft.svg';
import Reload from '../icons/Reload.svg';

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
    return (
      <div className="calendars-header">
        <div
          className="col"
          style={{ textAlign: 'center' }}
          onClick={this.goPrev}
          onKeyPress={this.goPrev}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            {' '}
            <ArrowLeft />
          </div>
        </div>
        <div
          className="col"
          onClick={this.resetDate}
          onKeyPress={this.resetDate}
          style={{ textAlign: 'center' }}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            <Reload />
          </div>
        </div>
        <div
          className="col"
          onClick={this.goNext}
          onKeyPress={this.goNext}
          style={{ textAlign: 'center' }}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            <ArrowRight />
          </div>
        </div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  onGoNext: PropTypes.func.isRequired,
  onGoPrev: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CalendarHeader;
