import gql from 'graphql-tag';

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
      country_placeholder
      categories
      countries_label
      country_placeholder
      regions_label
      cities_label
      arrival_date_label
      departure_date_label
      max_weekprice_label
      persons_min_label
      persons_max_label
      bedrooms_min_label
      bathrooms_min_label
      weekprice_max_label
      no_nights_label
      extra_search_label
      properties_label
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
        last_minute_days
        availabilities(starts_at: $starts_at, ends_at: $ends_at) {
          arrival
          arrival_time_from
          arrival_time_to
          date
          departure
          departure_time
          max_nights
          min_nights
          special_offer
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
      first_name_label
      preposition_label
      last_name_label
      email_label
      zipcode_label
      city_label
      address_label
      phone_label
      phone_mobile_label
      country_label
      iban_label
      holder_label
      bic_label
      comment_label
      company_name_label
      houses(house_code: $house_id) {
        id
        name
        persons
        image_url
        discounts
        discounts_info
        house_type
        rental_terms
        cancel_insurance
        damage_insurance
        damage_insurance_required
        travel_insurance
        booking_price(starts_at: $starts_at, ends_at: $ends_at)
      }
    }
  }
`;

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $first_name: String!
    $last_name: String!
    $is_option: Boolean!
    $address: String
    $zipcode: String
    $city: String
    $phone: String
    $email: String!
    $house_code: String!
    $portal_code: String
    $language: String
    $country: String!
    $adults: Int!
    $children: Int
    $babies: Int
    $pets: Int
    $discount: Int
    $damage_insurance: Int
    $cancel_insurance: Int
    $travel_insurance: Int
    $discount_reason: String
    $arrival_date: String!
    $departure_date: String!
    $costs: Json
  ) {
    createBooking(
      first_name: $first_name
      last_name: $last_name
      is_option: $is_option
      address: $address
      zipcode: $zipcode
      city: $city
      phone: $phone
      email: $email
      house_code: $house_code
      portal_code: $portal_code
      language: $language
      country: $country
      adults: $adults
      children: $children
      babies: $babies
      pets: $pets
      discount: $discount
      damage_insurance: $damage_insurance
      cancel_insurance: $cancel_insurance
      travel_insurance: $travel_insurance
      discount_reason: $discount_reason
      arrival_date: $arrival_date
      departure_date: $departure_date
      costs: $costs
    ) {
      booking_nr
    }
  }
`;
