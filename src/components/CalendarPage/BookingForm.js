import React from 'react';
import { Query } from "react-apollo";
import FormCreator from "./FormCreator";
import { BOOKING_PRICE_QUERY } from '../../_lib/queries'

class BookingForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            booking: this.props.booking
        }
    }



    render() {
        const { booking, locale } = this.props
        return (
            <Query
                query={BOOKING_PRICE_QUERY}
                variables={{
                    id: booking.portalCode,
                    house_id: booking.objectCode,
                    starts_at: booking.arrivalDate.date,
                    ends_at: booking.departureDate.date,
                    locale
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    const result = data.PortalSite.houses[0];
                    const options = data.PortalSite.options;


                        return  <FormCreator house={result} options={options} booking={this.state.booking} onReturn={() => {this.props.onReturn(this.props.booking)}} />;
                }}
            </Query>
        )

    }
}
export default BookingForm