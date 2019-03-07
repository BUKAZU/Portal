import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Calendar from './Calendar';
import BookingForm from './BookingForm';
import Loading from '../icons/loading.svg';

export const HOUSE_QUERY = gql`
  query PortalSiteHousesQuery($id: ID!, $house_id: String!) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        max_nights
        last_minute_days
        discounts
        discounts_info
      }
    }
  }
`;

class CalendarPage extends Component {
  constructor(props) {
    super(props);

    this.onBooking = this.onBooking.bind(this);
    this.onReturn = this.onReturn.bind(this);

    this.state = {
      bookingStarted: false,
      booking: {
        objectCode: '',
        portalCode: '',
        arrivalDate: {},
        departureDate: {},
        in_option: false,
      },
    };
  }

  onBooking(booking) {
    this.setState({
      bookingStarted: true,
      booking,
    });
  }

  onReturn(booking) {
    this.setState({
      bookingStarted: false,
      booking,
    });
  }

  calendar() {
    const { objectCode, PortalSite, locale } = this.props;
    const variables = {
      id: PortalSite.portal_code,
      house_id: objectCode,
      locale,
    };
    return (
      <Query query={HOUSE_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <Loading />
              </div>
            );
          if (error) return <div>Error</div>;

          const Results = data.PortalSite.houses;

          return (
            <div id="calendar-container">
              {Results.map(result => (
                <div key={result.id}>
                  <div className="house-name">{result.name}</div>
                  <Calendar
                    portalCode={variables.id}
                    objectCode={variables.house_id}
                    numberOfMonths={
                      PortalSite.options.bookingForm.numberOfMonths
                    }
                    house={result}
                    locale={locale}
                    onBooking={this.onBooking}
                  />
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }

  bookingForm() {
    return (
      <BookingForm
        booking={this.state.booking}
        locale={this.props.locale}
        onReturn={this.onReturn}
      />
    );
  }

  pageRendering() {
    if (this.state.bookingStarted) {
      return this.bookingForm();
    } else {
      return this.calendar();
    }
  }

  render() {
    return this.pageRendering();
  }
}

CalendarPage.propTypes = {
  objectCode: PropTypes.string.isRequired,
  // portalCode: PropTypes.string.isRequired,
  PortalSite: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default CalendarPage;
