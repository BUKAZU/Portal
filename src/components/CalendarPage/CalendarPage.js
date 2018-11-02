import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Calendar from "./Calendar";
import BookingForm from './BookingForm'

export const HOUSE_QUERY = gql`
  query PortalSiteHousesQuery($id: ID!, $house_id: String!) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        max_nights
      }
    }
  }
`;

class CalendarPage extends Component {
  constructor(props) {
    super(props);

    this.onBooking = this.onBooking.bind(this);

    this.state = {
      bookingStarted: false,
      booking: {}
    };
  }

  onBooking(booking) {
    console.log(booking);
    this.setState({
      bookingStarted: true,
      booking
    });
  }

  calendar() {
    const { objectCode, PortalSite, locale } = this.props;
    const variables = {
      id: PortalSite.portal_code,
      house_id: objectCode
    };
    return (
      <Query query={HOUSE_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const Results = data.PortalSite.houses;

          return (
            <div id="calendar-container">
              {Results.map(result => (
                <div key={result.id}>
                  <div>{result.name}</div>
                  <Calendar
                    portalCode={variables.id}
                    objectCode={variables.house_id}
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

    return <BookingForm booking={this.state.booking} />;
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

export default CalendarPage;
