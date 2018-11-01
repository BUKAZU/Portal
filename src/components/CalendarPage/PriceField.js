import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const CALENDAR_QUERY = gql`
  query BookingPriceQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        booking_price(starts_at: $starts_at, ends_at: $ends_at)
      }
    }
  }
`;

const PriceField = ({ portalCode, objectCode, startsAt, endsAt }) => (
    <Query query={CALENDAR_QUERY} variables={{
        id: portalCode,
        house_id: objectCode,
        starts_at: startsAt,
        ends_at: endsAt
    }}>
        {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            const result = data.PortalSite.houses[0].booking_price;

            return <div>{result.rent_price}</div>;
        }}
    </Query>
);

export default PriceField;