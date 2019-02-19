import gql from 'graphql-tag';

export const HOUSES_QUERY = gql`
  query PortalSiteHousesQuery(
    $id: ID!
    $country_id: ID
    $region_id: String
    $city_id: String
    $persons_min: Int
    $persons_max: Int
    $bedrooms_min: Int
    $bathrooms_min: Int
    $arrival_date: String
    $no_nights: Int
    $properties: String
    $weekprice_max: Int
    $limit: Int
    $skip: Int
  ) {
    PortalSite(id: $id) {
      houses(
        country_id: $country_id
        region_id: $region_id
        city_id: $city_id
        persons_min: $persons_min
        persons_max: $persons_max
        bedrooms_min: $bedrooms_min
        bathrooms_min: $bathrooms_min
        arrival_date: $arrival_date
        weekprice_max: $weekprice_max
        no_nights_min: $no_nights
        properties: $properties
        limit: $limit
        skip: $skip
      ) {
        id
        name
        persons
        bathrooms
        bedrooms
        description
        image_url
        house_url
        province
        city
        country_name
        minimum_week_price
      }
    }
  }
`;

export const HOUSE_COUNT_QUERY = gql`
  query PortalSiteHousesQuery(
    $id: ID!
    $country_id: ID
    $region_id: String
    $city_id: String
    $persons_min: Int
    $persons_max: Int
    $bedrooms_min: Int
    $bathrooms_min: Int
    $arrival_date: String
    $no_nights: Int
    $properties: String
    $weekprice_max: Int
  ) {
    PortalSite(id: $id) {
      houses(
        country_id: $country_id
        region_id: $region_id
        city_id: $city_id
        persons_min: $persons_min
        persons_max: $persons_max
        bedrooms_min: $bedrooms_min
        bathrooms_min: $bathrooms_min
        arrival_date: $arrival_date
        weekprice_max: $weekprice_max
        no_nights_min: $no_nights
        properties: $properties
      ) {
        id
      }
    }
  }
`;
