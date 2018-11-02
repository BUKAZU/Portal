import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FormCreator from "./FormCreator";

export const BOOKING_PRICE_QUERY = gql`
  query BookingPriceQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
  ) {
    PortalSite(id: $id) {
      options
      houses(house_code: $house_id) {
        id
        name
        persons
        image_url
        booking_price(starts_at: $starts_at, ends_at: $ends_at)
      }
    }
  }
`;

class BookingForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            booking: this.props.booking
        }
    }

    render() {
        const { booking } = this.props
        return (
            <Query
                query={BOOKING_PRICE_QUERY}
                variables={{
                    id: booking.portalCode,
                    house_id: booking.objectCode,
                    starts_at: booking.arrivalDate.date,
                    ends_at: booking.departureDate.date
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    const result = data.PortalSite.houses[0];
                    const options = data.PortalSite.options;

                    return <FormCreator house={result} options={options} booking={this.state.booking} />;
                }}
            </Query>
        )

    }
}
export default BookingForm