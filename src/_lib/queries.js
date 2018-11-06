import gql from "graphql-tag";

export const PORTAL_QUERY = gql`
  query PortalSiteQuery($id: ID!) {
    PortalSite(id: $id) {
      portal_code
      options
      countries {
        id
        name
      }
      regions {
        id
        name
        country_id
      }
      cities {
        id
        name
        region
        country_id
      }
      extra_search
      max_bathrooms
      max_bedrooms
      max_nights
      max_persons
      max_weekprice
      country_label
      country_placeholder
      region_label
    }
  }
`;

export const CALENDAR_QUERY = gql`
  query PortalSiteHousesQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
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
        house_type
        cancel_insurance
        damage_insurance
        damage_insurance_required
        travel_insurance
        booking_price(starts_at: $starts_at, ends_at: $ends_at)
      }
    }
  }
`;
